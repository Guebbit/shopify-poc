import type { CodegenConfig } from '@graphql-codegen/cli';

/*
 * GraphQL Codegen: types the Shopify Storefront transport (npm run gengql).
 * Introspects the live schema (needs .env) and generates typed documents from
 * contracts/graphql/*.graphql into contracts/graphql/generated/ — no handwritten response
 * types; app code imports the generated *Document constants.
 * The domain contract stays in contracts/rest/openapi.yaml (orval); this only covers transport.
 */
process.loadEnvFile('.env');

const endpoint = process.env.NUXT_PUBLIC_SHOPIFY_ENDPOINT ?? '';
const token = process.env.NUXT_PUBLIC_SHOPIFY_TOKEN ?? '';

export default {
    schema: [
        {
            [endpoint]: {
                headers: { 'X-Shopify-Storefront-Access-Token': token }
            }
        }
    ],
    documents: ['contracts/graphql/*.graphql'],
    generates: {
        // Single file: operation types + typed *Document constants.
        // No client preset: we never write inline gql`` in TS, so its gql.ts/index.ts
        // artifacts would be dead weight. No base `typescript` plugin either:
        // typescript-operations is self-contained (used inputs/enums only), the full
        // schema dump would duplicate them.
        'contracts/graphql/generated/graphql.ts': {
            plugins: ['typescript-operations', 'typed-document-node'],
            config: {
                // import type: @graphql-typed-document-node/core is types-only, bundlers can't resolve it as a value.
                useTypeImports: true,
                // Shopify custom scalars used by our documents.
                scalars: {
                    Decimal: 'string',
                    URL: 'string'
                }
            }
        }
    }
} satisfies CodegenConfig;
