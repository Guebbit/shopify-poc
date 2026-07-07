/*
 * Persistence seam for the Shopify cart id (survives reloads).
 * Single owner of the storage key: cart logic never touches localStorage
 * directly, so the medium can change (e.g. cookie for SSR) in one place.
 */
const CART_ID_STORAGE_KEY = 'shopify_cart_id';

/*
 * Read the persisted cart id.
 * @returns Shopify cart GID, or null when no cart was created yet
 */
export const readCartId = (): string | null => localStorage.getItem(CART_ID_STORAGE_KEY);

/*
 * Persist the cart id of a freshly created cart.
 * @param cartId Shopify cart GID
 */
export const writeCartId = (cartId: string): void =>
    localStorage.setItem(CART_ID_STORAGE_KEY, cartId);

/*
 * Forget the persisted cart id (expired/completed cart).
 */
export const clearCartId = (): void => localStorage.removeItem(CART_ID_STORAGE_KEY);
