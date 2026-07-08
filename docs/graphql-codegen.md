# The genql/Shopify schema dilemma

> **TL;DR:** `npm run genapi` (orval) is checked for freshness in CI.
> `npm run gengql` (graphql-codegen) is **not**, on purpose — verifying it needs a live
> connection to a real Shopify store, which CI can't assume.

## The asymmetry

Two generators, two very different trust levels:

| | `genapi` (orval) | `gengql` (graphql-codegen) |
|---|---|---|
| Source | `contracts/rest/openapi.yaml`, a file in this repo | Shopify's live Storefront schema, fetched by introspection |
| Needs network? | No — reads a local file | Yes — HTTPS request to `NUXT_PUBLIC_SHOPIFY_ENDPOINT` |
| Needs secrets? | No | Yes — `NUXT_PUBLIC_SHOPIFY_TOKEN` |
| Verified fresh in CI? | ✅ `api-freshness` job in `ci.yml` | ❌ no equivalent job |
| Output | `contracts/rest/generated/**` (types + zod) | `contracts/graphql/generated/graphql.ts` |

`ci.yml`'s `api-freshness` job runs `npm run genapi` and fails the build if that produces
a diff — the committed contract types can never silently drift from `openapi.yaml`,
because the spec is a file CI already has.

There is **no `gql-freshness` job**, and that's a deliberate omission, not an oversight.

## Why gengql can't get the same treatment

`codegen.ts` introspects `endpoint` over HTTPS using `token` for auth
(`codegen.ts:12-21`). Running that in CI would mean:

- **A real store must be reachable from CI.** GitHub-hosted runners have no guaranteed
  path to `callmewine-stage-uk.myshopify.com`; a network blip turns an unrelated PR red.
- **A live Shopify Storefront token becomes a CI secret.** That's a second credential to
  rotate and protect, for a job whose only purpose is to catch schema drift.
- **The result is non-deterministic.** Shopify's schema can change server-side (new API
  version, deprecated field) with no corresponding commit in this repo — a "freshness"
  check would be comparing against a moving target, not a pinned input.

Compare that to `genapi`: `openapi.yaml` is *ours*. It only changes when someone edits it
in this repo, so "regenerate and diff" is a deterministic, hermetic check. Shopify's
schema is *theirs* — we can observe it, we can't pin it, and CI shouldn't pretend
otherwise. See [docs/contracts.md](contracts.md) for the fuller ownership argument.

## What this means in practice

- `contracts/graphql/generated/graphql.ts` is committed, like the orval output, but CI takes it
  on faith.
- `.docker/Dockerfile.prod` explicitly does **not** run `gengql` during the image build
  (`RUN npm run build` only runs `genapi` — see the Dockerfile comment) — regenerating
  the GraphQL transport needs live store credentials that don't belong in a build stage.
- Drift between the committed file and Shopify's real schema is **not caught until
  someone runs `npm run gengql` locally** (which needs a working `.env`) and sees a diff,
  or until a query breaks at runtime because a field/type changed upstream.
- When you hand-edit a `.graphql` document under `contracts/graphql/*.graphql`, you must run
  `npm run gengql` locally (with valid `.env` credentials) and commit the regenerated
  `graphql.ts` yourself — nothing will remind you in a PR.

## One sentence to keep

**`genapi` is checked because its input lives in this repo; `gengql` isn't, because its
input lives on someone else's server.**
