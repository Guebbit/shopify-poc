# Risposta gestione regalo/messaggio

Inizialmente avrei seguito l'approccio che ho sempre seguito negli ecommerce del fashion: creare varianti light.
Ovvero quando un prodotto viene dinamicamente trasformato in un "finto nuovo prodotto" in base alle varianti che gli vengono date.
(quando un sito non ha voglia di creare un vero nuovo prodotto che estende uno già esistente)

Però l'AI mi ha suggerito di usare gli attributi, un approccio più leggero e già standard dello storefront API.
Ho pensato che fosse una buona idea in questo caso.

# shopify-poc

A Nuxt 4 storefront proof-of-concept: one product detail page and one cart, backed by
Shopify's Storefront GraphQL API, with a hand-owned domain contract sitting between the
app and that API.

## Why it's built this way

The app never lets Shopify's GraphQL shapes leak past the composables/stores that call
them. Everything above that line (pages, components, tests) only ever sees types drawn
from `contracts/rest/openapi.yaml` — a spec this repo owns, separate from Shopify's
schema. Two generators, two sources of truth:

- **`npm run genapi`** (orval) turns `contracts/rest/openapi.yaml` into TS types (`@api`) and
  zod schemas (`@api/schemas`) — the domain contract.
- **`npm run gengql`** (graphql-codegen) turns Shopify's live schema into typed query
  documents (`@api/graphql`) — the transport.

The adapter layer (`useProduct.ts`, `stores/cart.ts`) maps one into the other, validated
with zod at the boundary. Full writeup: **[docs/contracts.md](docs/contracts.md)**.

### Read next, one topic each

- **[docs/contracts.md](docs/contracts.md)** — the two-schema contract model above, in
  full, with the ownership argument for why they're kept separate.
- **[docs/graphql-codegen.md](docs/graphql-codegen.md)** — why `genapi` is checked for
  freshness in CI but `gengql` deliberately isn't (the live-Shopify-connection dilemma).
- **[docs/rendering-and-i18n.md](docs/rendering-and-i18n.md)** — why the product page is
  SSR'd per-locale and the cart never is, and how a `vue-i18n` locale becomes a Shopify
  `@inContext` market.
- **[docs/cart.md](docs/cart.md)** — how the cart id is persisted, re-pinned on language
  switch, and how gift-wrap options are encoded as plain Shopify cart attributes.

## Prerequisites

- Node.js 22+ (CI runs Node 22; the Docker images use Node 24 — either works locally)
- A Shopify Storefront API token for a store you can query (public/unauthenticated
  Storefront token, safe to expose client-side)
- Docker or Podman, only if you want the containerized path

## Environment variables

Copy the example file and fill in your store's credentials:

```bash
cp .env-example .env
```

| Variable                          | Meaning                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| `APP_PORT`                        | Dev server / container port (default `8080`); shared by Nuxt, docker-compose, and Cypress  |
| `NUXT_PUBLIC_SHOPIFY_ENDPOINT`    | Storefront GraphQL endpoint, e.g. `https://<store>.myshopify.com/api/2026-04/graphql.json` |
| `NUXT_PUBLIC_SHOPIFY_TOKEN`       | Storefront API public access token                                                         |
| `NUXT_PUBLIC_SHOPIFY_PRODUCT_GID` | GID of the single product this PoC displays, e.g. `gid://shopify/Product/123`              |

`NUXT_PUBLIC_*` vars are Nuxt `runtimeConfig.public` entries — they end up in the client
bundle, which is fine here since the Storefront token is meant to be public, unlike an
Admin API token.

## Local development (npm)

```bash
npm install
npm run genapi      # generates contracts/rest/generated/** from openapi.yaml — do this once, and again whenever you edit the spec
npm run dev
```

The app is served at `http://localhost:8080` (or `$APP_PORT`).

`npm run genapi` must run before the first `dev`/type-check: the `@api` and
`@api/schemas` aliases (`nuxt.config.ts`) point at generated files not committed in a
fresh clone. `npm run build` runs it automatically; `npm run dev` does not.

If you also need to touch the Shopify GraphQL documents under `contracts/graphql/*.graphql`,
regenerate their types too:

```bash
npm run gengql       # needs a valid .env — introspects your live store
```

This one is **not** run automatically anywhere (not in `dev`, not in `build`, not in CI —
see [docs/graphql-codegen.md](docs/graphql-codegen.md) for why) — run it by hand after
editing a `.graphql` document and commit the regenerated file yourself.

### Useful scripts

| Script                      | Does                                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run dev`               | Nuxt dev server                                                                                    |
| `npm run build`             | `genapi` + production build (`.output/`)                                                           |
| `npm run test:unit`         | Vitest, Nuxt test environment                                                                      |
| `npm run test:e2e`          | Boots `dev`, runs Cypress against it, tears down                                                   |
| `npm run test`              | unit + e2e                                                                                         |
| `npm run lint` / `lint:fix` | ESLint                                                                                             |
| `npm run lint:openapi`      | Spectral lint on `contracts/rest/openapi.yaml`                                                     |
| `npm run type-check-only`   | `vue-tsc --noEmit`                                                                                 |
| `npm run complete`          | build + lint:fix + lint:openapi + prettier:fix + test — the "make it all green" script             |
| `npm run complete:check`    | read-only version of the above (lint, prettier:check, type-check) — closest local equivalent to CI |

## Docker / Podman

`docker-compose.yml` defines `app` (dev, hot reload) and `app-prod` (prod Nitro build,
gated behind the `production` profile so it won't start on a plain `up`). Day-to-day
lifecycle is wrapped in npm scripts: `podman:restart` / `docker:restart`,
`podman:rebuild` / `docker:rebuild`, and `podman:nuke` / `docker:nuke` for when a
rootless engine gets stuck. `scripts/containerSmokeTest.sh` smoke-tests the prod image
against both engines.

## Testing

- **Unit** (`npm run test:unit`): Vitest, booted in a Nuxt test environment so composables
  and auto-imports work exactly as in the app (`vitest.config.ts`).
- **E2E** (`npm run test:e2e`): `start-server-and-test` boots `npm run dev`, waits for
  `http://localhost:$APP_PORT`, runs Cypress specs under `cypress/e2e/`, then tears the
  server down.

## CI

`.github/workflows/ci.yml` runs, per PR and per push to `main`: commit-lint (push only),
ESLint, Prettier check, OpenAPI spec lint (Spectral), an **API freshness** check
(re-runs `npm run genapi` and fails on any diff — see
[docs/graphql-codegen.md](docs/graphql-codegen.md) for why there's no GraphQL equivalent),
type-check, production build, unit tests, and e2e tests. A final `ci` job fans in all of
the above into one required status check.
