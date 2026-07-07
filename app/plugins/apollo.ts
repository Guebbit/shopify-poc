import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Const key: header names are not valid JS identifiers.
const SHOPIFY_TOKEN_HEADER = 'X-Shopify-Storefront-Access-Token';

/*
 * Apollo client for the Shopify Storefront API, provided as $shopify.
 * Transport only: app state lives in Pinia stores as contract shapes and
 * response caching is handled by useCachedAsyncData, so Apollo runs with
 * no-cache (the InMemoryCache instance is required by the constructor but
 * never written to or read).
 */
export default defineNuxtPlugin(() => {
    const { shopifyEndpoint, shopifyToken } = useRuntimeConfig().public;

    return {
        provide: {
            shopify: new ApolloClient({
                link: new HttpLink({
                    uri: shopifyEndpoint,
                    headers: { [SHOPIFY_TOKEN_HEADER]: shopifyToken }
                }),
                cache: new InMemoryCache(),
                defaultOptions: {
                    query: { fetchPolicy: 'no-cache' },
                    watchQuery: { fetchPolicy: 'no-cache' },
                    mutate: { fetchPolicy: 'no-cache' }
                }
            })
        }
    };
});
