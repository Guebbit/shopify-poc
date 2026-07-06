import { graphql } from './generated';

/*
 * Cart fields shared by every cart query/mutation, so all calls return the same shape.
 */
export const CART_FIELDS_FRAGMENT = graphql(`
    fragment CartFields on Cart {
        id
        totalQuantity
        cost {
            subtotalAmount {
                amount
                currencyCode
            }
        }
        lines(first: 50) {
            nodes {
                id
                quantity
                attributes {
                    key
                    value
                }
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
                merchandise {
                    ... on ProductVariant {
                        id
                        product {
                            title
                            vendor
                            featuredImage {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`);

export const CART_CREATE_MUTATION = graphql(`
    mutation CartCreate {
        cartCreate {
            cart {
                ...CartFields
            }
            userErrors {
                message
            }
        }
    }
`);

export const CART_LINES_ADD_MUTATION = graphql(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...CartFields
            }
            userErrors {
                message
            }
        }
    }
`);

export const CART_QUERY = graphql(`
    query Cart($cartId: ID!) {
        cart(id: $cartId) {
            ...CartFields
        }
    }
`);
