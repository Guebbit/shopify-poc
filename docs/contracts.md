# Two schemas, one contract — cheat sheet

> **TL;DR:** GraphQL schema = what Shopify *can* give.
> `contracts/rest/openapi.yaml` = what my app *promises to work with*.
> The composables translate one into the other, and zod checks it.

## The picture

```
        THEIRS                                MINE
┌─────────────────────┐          ┌──────────────────────────┐
│  Shopify Storefront │          │ contracts/rest/openapi.yaml │
│   GraphQL schema    │          │    (domain contract)     │
│  (huge, not mine)   │          │  Product, Cart, Money…   │
└──────────┬──────────┘          └──────────┬───────────────┘
           │ npm run gengql                 │ npm run genapi
           ▼ (graphql-codegen)              ▼ (orval)
   typed queries in               contracts/rest/generated/:
   contracts/graphql/generated/   TS types (@api)
   (@api/graphql)                 zod schemas (@api/schemas)
           │                                │
           ▼                                ▼
┌──────────────────────────────────────────────────────────┐
│              ADAPTER LAYER  ← contract enforced here     │
│         useProduct.ts / stores/cart.ts                   │
│                                                          │
│   Apollo response ──── map + zod .parse() ──▶ Product    │
└──────────────────────────┬───────────────────────────────┘
                           ▼
              rest of the app (pages, components, tests)
              only ever sees openapi.yaml shapes
```

## Why two codegen tools (they don't compete)

| | graphql-codegen (`gengql`) | orval (`genapi`) |
|---|---|---|
| Source | Shopify's live schema | my `contracts/rest/openapi.yaml` |
| Types | what comes off the wire | my domain shapes |
| Owner | Shopify | me |
| Job | type the **transport** | type the **contract** + zod |

Orval generates **no HTTP client** — Apollo does the HTTP.
Orval only exists for types / zod.

## One source of truth *per system*

The tempting idea — merge everything into a single `openapi.yaml` — is wrong because
**a source of truth should be owned by whoever can change the truth.**
I own my domain → `openapi.yaml` is its truth. Shopify owns its API → its schema is
that truth, and `gengql` already fetches it live via introspection. Copying it into
a file I maintain wouldn't unify anything; it would create a second, driftable copy.

So: one truth per system, with explicit ownership, and the adapter layer as the
deliberate seam where they meet. The hand-written mappings there aren't boilerplate —
they're the one place vendor churn gets absorbed instead of leaking into the app.

## Is this "contract-driven"? Yes, but shifted inward

Classic contract-driven needs to own the server. Shopify is the server → can't.
So the contract moved from *client↔server* to *outside-world↔app-core*.

- ✅ Everything inside the app is contract-pure (types, tests from the spec)
- ⚠️ Nobody upstream enforces it — drift is caught by `.parse()` (runtime) or `gengql` (build)
- ⚠️ The mappings (`useProduct.ts`, `normalizeCart` in `stores/cart.ts`) are hand-maintained
- ⚠️ Nothing validates my spec *against* Shopify's schema

## One sentence to keep

**Shopify's schema is the menu; `openapi.yaml` is my order; the adapter layer is the waiter; zod checks the plate.**
