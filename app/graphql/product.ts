import { graphql } from './generated';

/*
 * PDP product query: first variant only, no variant selector in this exercise.
 */
export const PRODUCT_DETAIL_QUERY = graphql(`
    query ProductDetail($id: ID!) {
        product(id: $id) {
            id
            title
            vendor
            featuredImage {
                url
                altText
            }
            variants(first: 1) {
                nodes {
                    id
                    availableForSale
                    price {
                        amount
                        currencyCode
                    }
                    compareAtPrice {
                        amount
                        currencyCode
                    }
                }
            }
        }
    }
`);
