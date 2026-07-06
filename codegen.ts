import type { CodegenConfig } from '@graphql-codegen/cli';

/*
 * GraphQL Codegen: types the Shopify Storefront transport (npm run gengql).
 * Introspects the live schema (needs .env) and generates typed documents from
 * app/graphql/*.ts into app/graphql/generated/ — no handwritten response types.
 * The domain contract stays in openapi.yaml (orval); this only covers transport.
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
    documents: ['app/graphql/*.ts'],
    generates: {
        'app/graphql/generated/': {
            preset: 'client',
            presetConfig: {
                // Plain typed results; fragment masking is overkill here.
                fragmentMasking: false
            },
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
