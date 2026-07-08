import { defineConfig } from 'orval';

/**
 * Orval configuration: generates the contract layer from contracts/rest/openapi.yaml.
 *
 * The spec is the domain contract only — no REST server exists and no HTTP
 * client is generated. Shopify calls go through GraphQL (see codegen.ts);
 * adapters map the responses into these contract shapes.
 *
 * target (zod):    Zod schemas matching each OpenAPI model → contracts/rest/generated/schemas.zod.ts
 *                  Import from @api/schemas to parse API responses at the boundary.
 *                  Always in sync with the spec — never hand-write these.
 *
 * schemas (types): Plain TS types for the models → contracts/rest/generated/types/
 *                  Import from @api; never hand-write types that duplicate the spec.
 */
export default defineConfig({
    contract: {
        input: './contracts/rest/openapi.yaml',
        output: {
            mode: 'single',
            client: 'zod',
            target: './contracts/rest/generated/schemas.zod.ts',
            schemas: {
                path: './contracts/rest/generated/types',
                type: 'typescript'
            }
        }
    }
});
