/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    fragment CartFields on Cart {\n        id\n        totalQuantity\n        cost {\n            subtotalAmount {\n                amount\n                currencyCode\n            }\n        }\n        lines(first: 50) {\n            nodes {\n                id\n                quantity\n                attributes {\n                    key\n                    value\n                }\n                cost {\n                    totalAmount {\n                        amount\n                        currencyCode\n                    }\n                }\n                merchandise {\n                    ... on ProductVariant {\n                        id\n                        product {\n                            title\n                            vendor\n                            featuredImage {\n                                url\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n": typeof types.CartFieldsFragmentDoc,
    "\n    mutation CartCreate {\n        cartCreate {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n": typeof types.CartCreateDocument,
    "\n    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n        cartLinesAdd(cartId: $cartId, lines: $lines) {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n": typeof types.CartLinesAddDocument,
    "\n    query Cart($cartId: ID!) {\n        cart(id: $cartId) {\n            ...CartFields\n        }\n    }\n": typeof types.CartDocument,
    "\n    query ProductDetail($id: ID!) {\n        product(id: $id) {\n            id\n            title\n            vendor\n            featuredImage {\n                url\n                altText\n            }\n            variants(first: 1) {\n                nodes {\n                    id\n                    availableForSale\n                    price {\n                        amount\n                        currencyCode\n                    }\n                    compareAtPrice {\n                        amount\n                        currencyCode\n                    }\n                }\n            }\n        }\n    }\n": typeof types.ProductDetailDocument,
};
const documents: Documents = {
    "\n    fragment CartFields on Cart {\n        id\n        totalQuantity\n        cost {\n            subtotalAmount {\n                amount\n                currencyCode\n            }\n        }\n        lines(first: 50) {\n            nodes {\n                id\n                quantity\n                attributes {\n                    key\n                    value\n                }\n                cost {\n                    totalAmount {\n                        amount\n                        currencyCode\n                    }\n                }\n                merchandise {\n                    ... on ProductVariant {\n                        id\n                        product {\n                            title\n                            vendor\n                            featuredImage {\n                                url\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n": types.CartFieldsFragmentDoc,
    "\n    mutation CartCreate {\n        cartCreate {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n": types.CartCreateDocument,
    "\n    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n        cartLinesAdd(cartId: $cartId, lines: $lines) {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n": types.CartLinesAddDocument,
    "\n    query Cart($cartId: ID!) {\n        cart(id: $cartId) {\n            ...CartFields\n        }\n    }\n": types.CartDocument,
    "\n    query ProductDetail($id: ID!) {\n        product(id: $id) {\n            id\n            title\n            vendor\n            featuredImage {\n                url\n                altText\n            }\n            variants(first: 1) {\n                nodes {\n                    id\n                    availableForSale\n                    price {\n                        amount\n                        currencyCode\n                    }\n                    compareAtPrice {\n                        amount\n                        currencyCode\n                    }\n                }\n            }\n        }\n    }\n": types.ProductDetailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment CartFields on Cart {\n        id\n        totalQuantity\n        cost {\n            subtotalAmount {\n                amount\n                currencyCode\n            }\n        }\n        lines(first: 50) {\n            nodes {\n                id\n                quantity\n                attributes {\n                    key\n                    value\n                }\n                cost {\n                    totalAmount {\n                        amount\n                        currencyCode\n                    }\n                }\n                merchandise {\n                    ... on ProductVariant {\n                        id\n                        product {\n                            title\n                            vendor\n                            featuredImage {\n                                url\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment CartFields on Cart {\n        id\n        totalQuantity\n        cost {\n            subtotalAmount {\n                amount\n                currencyCode\n            }\n        }\n        lines(first: 50) {\n            nodes {\n                id\n                quantity\n                attributes {\n                    key\n                    value\n                }\n                cost {\n                    totalAmount {\n                        amount\n                        currencyCode\n                    }\n                }\n                merchandise {\n                    ... on ProductVariant {\n                        id\n                        product {\n                            title\n                            vendor\n                            featuredImage {\n                                url\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CartCreate {\n        cartCreate {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CartCreate {\n        cartCreate {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n        cartLinesAdd(cartId: $cartId, lines: $lines) {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n        cartLinesAdd(cartId: $cartId, lines: $lines) {\n            cart {\n                ...CartFields\n            }\n            userErrors {\n                message\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Cart($cartId: ID!) {\n        cart(id: $cartId) {\n            ...CartFields\n        }\n    }\n"): (typeof documents)["\n    query Cart($cartId: ID!) {\n        cart(id: $cartId) {\n            ...CartFields\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ProductDetail($id: ID!) {\n        product(id: $id) {\n            id\n            title\n            vendor\n            featuredImage {\n                url\n                altText\n            }\n            variants(first: 1) {\n                nodes {\n                    id\n                    availableForSale\n                    price {\n                        amount\n                        currencyCode\n                    }\n                    compareAtPrice {\n                        amount\n                        currencyCode\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query ProductDetail($id: ID!) {\n        product(id: $id) {\n            id\n            title\n            vendor\n            featuredImage {\n                url\n                altText\n            }\n            variants(first: 1) {\n                nodes {\n                    id\n                    availableForSale\n                    price {\n                        amount\n                        currencyCode\n                    }\n                    compareAtPrice {\n                        amount\n                        currencyCode\n                    }\n                }\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;