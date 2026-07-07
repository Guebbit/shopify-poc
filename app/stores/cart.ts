import { defineStore } from 'pinia';
import type { Cart, CartLineAttribute, CartLineInput } from '@api';
import { GetCartResponse } from '@api/schemas';
import {
    CartBuyerIdentityUpdateDocument,
    CartCreateDocument,
    CartDocument,
    CartLinesAddDocument,
    type CartFieldsFragment
} from '@api/graphql';

/*
 * Map a Shopify cart (CartFields fragment) to the OpenAPI Cart contract,
 * validated at the boundary with the generated zod schema.
 * @param raw cart as returned by the Storefront API
 * @returns contract Cart; throws when the shape drifts from the spec
 */
const normalizeCart = (raw: CartFieldsFragment): Cart => {
    return GetCartResponse.parse({
        id: raw.id,
        totalQuantity: raw.totalQuantity,
        subtotal: raw.cost.subtotalAmount,
        lines: raw.lines.nodes.map((line) => ({
            id: line.id,
            quantity: line.quantity,
            title: line.merchandise.product.title,
            vendor: line.merchandise.product.vendor,
            image: line.merchandise.product.featuredImage ?? undefined,
            lineTotal: line.cost.totalAmount,
            attributes: line.attributes
        }))
    });
};

/*
 * Throw when a Storefront cart mutation reports user errors or no cart.
 * @param payload mutation payload with cart + userErrors
 * @returns the non-null cart from the payload
 */
const unwrapMutation = (
    payload:
        { cart?: CartFieldsFragment | null; userErrors: { message: string }[] } | null | undefined
): CartFieldsFragment => {
    if (payload?.userErrors.length) {
        throw new Error(payload.userErrors.map((error) => error.message).join('; '));
    }
    if (!payload?.cart) {
        throw new Error('Shopify returned no cart');
    }
    return payload.cart;
};

/*
 * Cart store: lazy cartCreate, cart id persisted via cartIdStorage,
 * cartLinesAdd with gift attributes, cart fetch for the cart page.
 * Holds the single app-wide cart (header badge + cart page).
 */
export const useCartStore = defineStore('cart', () => {
    const { $shopify } = useNuxtApp();
    const shopifyContext = useShopifyContext();
    const cart = ref<Cart | undefined>();

    /*
     * Return the persisted cart id, creating a new cart via cartCreate when missing.
     * The new cart is pinned to the current locale's market (buyerIdentity),
     * so pricing/currency and checkout language match what the visitor browsed.
     * Promise.try: sync errors (e.g. no localStorage) become rejections.
     * @returns Shopify cart GID
     */
    const ensureCartId = (): Promise<string> => {
        return Promise.try(readCartId).then((stored) => {
            if (stored) return stored;
            return $shopify
                .mutate({ mutation: CartCreateDocument, variables: shopifyContext.value })
                .then(({ data }) => {
                    const raw = unwrapMutation(data?.cartCreate);
                    writeCartId(raw.id);
                    return raw.id;
                });
        });
    };

    /*
     * Add one unit of a variant to the cart via cartLinesAdd.
     * @param variantId ProductVariant GID (not the product GID)
     * @param attributes line attributes, e.g. from buildGiftAttributes
     */
    const addToCart = (variantId: string, attributes: CartLineAttribute[] = []): Promise<void> => {
        const lines: CartLineInput[] = [{ merchandiseId: variantId, quantity: 1, attributes }];
        return ensureCartId()
            .then((cartId) =>
                $shopify.mutate({
                    mutation: CartLinesAddDocument,
                    variables: { cartId, lines, ...shopifyContext.value }
                })
            )
            .then(({ data }) => {
                cart.value = normalizeCart(unwrapMutation(data?.cartLinesAdd));
            });
    };

    /*
     * Re-pin the persisted cart to the current locale's market after a language
     * switch, so line pricing and the eventual checkout follow the new locale.
     * No-op when no cart exists yet (the next cartCreate picks up the locale).
     */
    const syncBuyerIdentity = (): Promise<void> => {
        return Promise.try(readCartId).then((cartId) => {
            if (!cartId) return;
            return $shopify
                .mutate({
                    mutation: CartBuyerIdentityUpdateDocument,
                    variables: { cartId, ...shopifyContext.value }
                })
                .then(({ data }) => {
                    cart.value = normalizeCart(unwrapMutation(data?.cartBuyerIdentityUpdate));
                });
        });
    };

    /*
     * Load the persisted cart from Shopify.
     * Drops the stored id when Shopify no longer knows the cart (expired/completed).
     * @returns contract Cart, or undefined when there is no cart yet
     */
    const fetchCart = (): Promise<Cart | undefined> => {
        return Promise.try(readCartId).then((cartId) => {
            if (!cartId) {
                cart.value = undefined;
                return;
            }
            return $shopify
                .query({ query: CartDocument, variables: { cartId, ...shopifyContext.value } })
                .then(({ data }) => {
                    if (!data?.cart) {
                        clearCartId();
                        cart.value = undefined;
                        return;
                    }
                    cart.value = normalizeCart(data.cart);
                    return cart.value;
                });
        });
    };

    return { cart, addToCart, fetchCart, syncBuyerIdentity };
});
