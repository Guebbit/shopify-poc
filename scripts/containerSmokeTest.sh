#!/usr/bin/env bash
set -euo pipefail

# Container smoke test for the production image (.docker/Dockerfile.prod).
# A successful build only proves the image assembles; this boots it and asserts the
# container-specific wiring: CMD path, env passthrough, port binding, SSR responses.
#
# Engine-agnostic: uses docker or podman (autodetected, docker first — on podman-only
# hosts `docker` is often the podman shim anyway). Override with CONTAINER_ENGINE=podman.
#
# Usage: scripts/containerSmokeTest.sh   (from the repo root; needs .env for Shopify creds)

ENGINE="${CONTAINER_ENGINE:-}"
if [[ -z "$ENGINE" ]]; then
    if command -v docker > /dev/null 2>&1; then
        ENGINE=docker
    elif command -v podman > /dev/null 2>&1; then
        ENGINE=podman
    else
        echo "FAIL: neither docker nor podman found (set CONTAINER_ENGINE)" >&2
        exit 1
    fi
fi

IMAGE=shopify-poc-prod
CONTAINER=shopify-poc-smoke
PORT="${SMOKE_PORT:-8098}"
BASE_URL="http://localhost:$PORT"

# .env uses "KEY = value"; container --env-file wants "KEY=value".
ENV_FILE="$(mktemp)"

cleanup() {
    "$ENGINE" rm -f "$CONTAINER" > /dev/null 2>&1 || true
    rm -f "$ENV_FILE"
}
trap cleanup EXIT

if [[ -f .env ]]; then
    sed 's/ = /=/' .env > "$ENV_FILE"
else
    echo "WARN: no .env — booting without Shopify credentials (SSR shell checks only)" >&2
fi

echo "==> [$ENGINE] building production image"
"$ENGINE" build --quiet -f .docker/Dockerfile.prod -t "$IMAGE" .

echo "==> [$ENGINE] booting container on :$PORT"
"$ENGINE" run --rm -d --name "$CONTAINER" --env-file "$ENV_FILE" -p "$PORT:8080" "$IMAGE" > /dev/null

for _ in $(seq 1 30); do
    curl -fsS -o /dev/null "$BASE_URL/" 2> /dev/null && break
    sleep 0.5
done

fail() {
    echo "FAIL: $1" >&2
    echo "--- container logs ---" >&2
    "$ENGINE" logs "$CONTAINER" >&2 || true
    exit 1
}

pdp_it="$(curl -fsS "$BASE_URL/it")" || fail "GET /it did not respond"

# SSR shell: locale-dependent markup must be in the server response, not client-rendered.
grep -q 'lang="it-IT"' <<< "$pdp_it" || fail "/it is missing SSR html lang=\"it-IT\""
grep -q 'hreflang="it-IT"' <<< "$pdp_it" || fail "/it is missing SSR hreflang alternate links"

# Localized catalog content (needs Shopify creds + network): warn-only, CI may be offline.
if grep -q '<h1' <<< "$pdp_it"; then
    echo "OK: /it serves server-rendered product content"
else
    echo "WARN: /it has no server-rendered product (missing creds or store unreachable?)" >&2
fi

# Cart is private per-user state: must stay a client-only shell (routeRules in nuxt.config).
cart_it="$(curl -fsS "$BASE_URL/it/carrello")" || fail "GET /it/carrello did not respond"
grep -q '<h1' <<< "$cart_it" && fail "/it/carrello is server-rendered but must be client-only"

echo "OK: container smoke test passed ($ENGINE)"
