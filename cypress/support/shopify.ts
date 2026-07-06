/* eslint-disable @typescript-eslint/naming-convention -- __typename is Apollo's fixed discriminator field */
/*
 * Shopify Storefront API mocks for e2e: one cy.intercept routes every
 * GraphQL POST by operationName, so tests run without a real store.
 * __typename is included because Apollo's cache needs it to match the
 * `... on ProductVariant` fragment on cart line merchandise.
 */

export const PRODUCT_TITLE = 'Amarone della Valpolicella 2019';
export const VARIANT_ID = 'gid://shopify/ProductVariant/11';
export const GIFT_MESSAGE = 'Happy birthday!';

// 1x1 gif so product/line images never hit the network.
const IMAGE_URL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const money = (amount: string) => ({ __typename: 'MoneyV2', amount, currencyCode: 'EUR' });

const productDetail = {
    product: {
        __typename: 'Product',
        id: 'gid://shopify/Product/1',
        title: PRODUCT_TITLE,
        vendor: 'Callmewine',
        featuredImage: { __typename: 'Image', url: IMAGE_URL, altText: PRODUCT_TITLE },
        variants: {
            __typename: 'ProductVariantConnection',
            nodes: [
                {
                    __typename: 'ProductVariant',
                    id: VARIANT_ID,
                    availableForSale: true,
                    price: money('42.5'),
                    compareAtPrice: money('49.9')
                }
            ]
        }
    }
};

const emptyCart = {
    __typename: 'Cart',
    id: 'gid://shopify/Cart/e2e-cart',
    totalQuantity: 0,
    cost: { __typename: 'CartCost', subtotalAmount: money('0') },
    lines: { __typename: 'BaseCartLineConnection', nodes: [] }
};

const giftCart = {
    ...emptyCart,
    totalQuantity: 1,
    cost: { __typename: 'CartCost', subtotalAmount: money('42.5') },
    lines: {
        __typename: 'BaseCartLineConnection',
        nodes: [
            {
                __typename: 'CartLine',
                id: 'gid://shopify/CartLine/1',
                quantity: 1,
                attributes: [
                    { __typename: 'Attribute', key: 'gift_wrap', value: 'true' },
                    { __typename: 'Attribute', key: 'gift_message', value: GIFT_MESSAGE }
                ],
                cost: { __typename: 'CartLineCost', totalAmount: money('42.5') },
                merchandise: {
                    __typename: 'ProductVariant',
                    id: VARIANT_ID,
                    product: {
                        __typename: 'Product',
                        title: PRODUCT_TITLE,
                        vendor: 'Callmewine',
                        featuredImage: { __typename: 'Image', url: IMAGE_URL }
                    }
                }
            }
        ]
    }
};

/*
 * Stub the Storefront endpoint. Each operation is aliased by its own name,
 * so specs can cy.wait('@ProductDetail'), cy.wait('@CartLinesAdd'), etc.
 */
export function interceptShopify(): void {
    cy.intercept('POST', '**/graphql.json', (request) => {
        const operationName: string = request.body.operationName;
        request.alias = operationName;
        switch (operationName) {
            case 'ProductDetail': {
                request.reply({ body: { data: productDetail } });
                break;
            }
            case 'CartCreate': {
                request.reply({
                    body: {
                        data: {
                            cartCreate: {
                                __typename: 'CartCreatePayload',
                                cart: emptyCart,
                                userErrors: []
                            }
                        }
                    }
                });
                break;
            }
            case 'CartLinesAdd': {
                request.reply({
                    body: {
                        data: {
                            cartLinesAdd: {
                                __typename: 'CartLinesAddPayload',
                                cart: giftCart,
                                userErrors: []
                            }
                        }
                    }
                });
                break;
            }
            case 'Cart': {
                request.reply({ body: { data: { cart: giftCart } } });
                break;
            }
            default: {
                request.reply({ body: { data: {} } });
            }
        }
    });
}
