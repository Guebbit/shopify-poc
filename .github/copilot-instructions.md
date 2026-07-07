# Copilot instructions

Repo = Vue frontend boilerplate.
This repo = `shopify-poc`.

## Mandatory pre-work checklist

- Treat this file as required repository policy and follow it during the whole task.
- For every change, check whether documentation must be updated.

## Code brain

- Keep code SOLID.
- Keep code DRY.
- Keep code KISS.
- Prefer composables/stores over duplicated view logic.
- `api/rest/openapi.yaml` first. It is the domain contract; generated types and schemas start there.
- Use contract types from `@api` (`api/rest/generated/index.ts`); never hand-write types that duplicate the spec.
- Shopify calls go through the GraphQL documents in `api/graphql/*.graphql`, typed via `@api/graphql` (graphql-codegen); avoid untyped/inline queries.
- Use generated Zod schemas from `@api/schemas` (`api/rest/generated/schemas.zod.ts`) to validate API responses at the boundary before they enter app state; never hand-write schemas that duplicate the spec.
- Keep comments short and practical.
- Avoid `async` / `await` + `try/catch` unless necessary.
- Comments short. ADHD friendly. Explain function/constant/block fast.
- **All functions and important code blocks must have a JSDoc comment** in multi-line `/* \n * ... \n */` block format (not `/** */`). Include `@param` and `@returns` where useful. One line per tag.
- Do not dump long essays in code comments. Put detail in docs.
