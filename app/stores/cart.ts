import { defineStore } from 'pinia';
import type { Cart, CartLineAttribute, CartLineInput } from '@api';
import { GetCartResponse } from '@api/schemas';
import { CART_CREATE_MUTATION, CART_LINES_ADD_MUTATION, CART_QUERY } from '~/graphql/cart';
import type { CartFieldsFragment } from '~/graphql/generated/graphql';

const CART_ID_STORAGE_KEY = 'shopify_cart_id';

/*
 * Map a Shopify cart (CartFields fragment) to the OpenAPI Cart contract,
 * validated at the boundary with the generated zod schema.
 * @param raw cart as returned by the Storefront API
 * @returns contract Cart; throws when the shape drifts from the spec
 */
function normalizeCart(raw: CartFieldsFragment): Cart {
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
}

/*
 * Throw when a Storefront cart mutation reports user errors or no cart.
 * @param payload mutation payload with cart + userErrors
 * @returns the non-null cart from the payload
 */
function unwrapMutation(
    payload:
        { cart?: CartFieldsFragment | null; userErrors: { message: string }[] } | null | undefined
): CartFieldsFragment {
    if (payload?.userErrors.length) {
        throw new Error(payload.userErrors.map((error) => error.message).join('; '));
    }
    if (!payload?.cart) {
        throw new Error('Shopify returned no cart');
    }
    return payload.cart;
}

/*
 * Cart store: lazy cartCreate, cart id persisted in localStorage,
 * cartLinesAdd with gift attributes, cart fetch for the cart page.
 * Holds the single app-wide cart (header badge + cart page).
 */
export const useCartStore = defineStore('cart', () => {
    const { $shopify } = useNuxtApp();
    const cart = ref<Cart | undefined>();

    /*
     * Return the persisted cart id, creating a new cart via cartCreate when missing.
     * @returns Shopify cart GID
     */
    function ensureCartId(): Promise<string> {
        const stored = localStorage.getItem(CART_ID_STORAGE_KEY);
        if (stored) return Promise.resolve(stored);
        return $shopify.mutate({ mutation: CART_CREATE_MUTATION }).then(({ data }) => {
            const raw = unwrapMutation(data?.cartCreate);
            localStorage.setItem(CART_ID_STORAGE_KEY, raw.id);
            return raw.id;
        });
    }

    /*
     * Add one unit of a variant to the cart via cartLinesAdd.
     * @param variantId ProductVariant GID (not the product GID)
     * @param attributes line attributes, e.g. from buildGiftAttributes
     */
    function addToCart(variantId: string, attributes: CartLineAttribute[] = []): Promise<void> {
        const lines: CartLineInput[] = [{ merchandiseId: variantId, quantity: 1, attributes }];
        return ensureCartId()
            .then((cartId) =>
                $shopify.mutate({ mutation: CART_LINES_ADD_MUTATION, variables: { cartId, lines } })
            )
            .then(({ data }) => {
                cart.value = normalizeCart(unwrapMutation(data?.cartLinesAdd));
            });
    }

    /*
     * Load the persisted cart from Shopify.
     * Drops the stored id when Shopify no longer knows the cart (expired/completed).
     * @returns contract Cart, or undefined when there is no cart yet
     */
    function fetchCart(): Promise<Cart | undefined> {
        // Promise.try: sync errors (e.g. no localStorage) become rejections.
        return Promise.try(() => localStorage.getItem(CART_ID_STORAGE_KEY)).then((cartId) => {
            if (!cartId) {
                cart.value = undefined;
                return;
            }
            return $shopify.query({ query: CART_QUERY, variables: { cartId } }).then(({ data }) => {
                if (!data?.cart) {
                    localStorage.removeItem(CART_ID_STORAGE_KEY);
                    cart.value = undefined;
                    return;
                }
                cart.value = normalizeCart(data.cart);
                return cart.value;
            });
        });
    }

    return { cart, addToCart, fetchCart };
});
