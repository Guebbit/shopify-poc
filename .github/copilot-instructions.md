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
- `openapi.yaml` first. Contract and all generated code starts there.
- Use generated API functions from `@api` (`api/index.ts`); avoid manual endpoint wrappers unless required.
- Use generated Zod schemas from `@api/schemas` (`api/schemas.zod.ts`) for form and response validation; never hand-write schemas that duplicate the spec.
- When adding a new endpoint handler for MSW, start from the generated stub in `tests/mocks/generated.ts`, then move business logic to `tests/mocks/handlers/`.
- Keep comments short and practical.
- Avoid `async` / `await` + `try/catch` unless necessary.
- Comments short. ADHD friendly. Explain function/constant/block fast.
- **All functions and important code blocks must have a JSDoc comment** in multi-line `/* \n * ... \n */` block format (not `/** */`). Include `@param` and `@returns` where useful. One line per tag.
- Do not dump long essays in code comments. Put detail in docs.
