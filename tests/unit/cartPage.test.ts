import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { clearNuxtData } from '#app';
import CartPage from '../../app/pages/cart.vue';
import type { Cart } from '@api';
import { GIFT_MESSAGE_ATTRIBUTE, GIFT_WRAP_ATTRIBUTE } from '../../app/utils/giftAttributes';

// vi.hoisted: mockNuxtImport factories are hoisted above imports,
// so they may only reference hoisted bindings.
const { useCartStoreMock } = vi.hoisted(() => ({ useCartStoreMock: vi.fn() }));

mockNuxtImport('useCartStore', () => useCartStoreMock);

const cartFixture: Cart = {
    id: 'gid://shopify/Cart/1',
    totalQuantity: 2,
    subtotal: { amount: '85', currencyCode: 'EUR' },
    lines: [
        {
            id: 'gid://shopify/CartLine/1',
            quantity: 2,
            title: 'Amarone della Valpolicella 2019',
            vendor: 'Callmewine',
            image: { url: 'https://example.com/wine.jpg' },
            lineTotal: { amount: '85', currencyCode: 'EUR' },
            attributes: [
                { key: GIFT_WRAP_ATTRIBUTE, value: 'true' },
                { key: GIFT_MESSAGE_ATTRIBUTE, value: 'Happy birthday!' }
            ]
        }
    ]
};

// Plain object with a ref works for storeToRefs: it picks up any ref property.
function mockCart(cart: Cart | undefined): void {
    useCartStoreMock.mockReturnValue({
        cart: ref(cart),
        fetchCart: () => Promise.resolve(cart),
        addToCart: vi.fn()
    });
}

beforeEach(() => {
    // useAsyncData caches by key across mounts: reset between tests.
    clearNuxtData();
});

describe('Cart page', () => {
    it('shows the empty state with a link back to the product', async () => {
        mockCart(undefined);
        const wrapper = await mountSuspended(CartPage);
        expect(wrapper.text()).toContain('Your cart is empty');
        expect(wrapper.find('a[href="/"]').text()).toContain('back to the product');
    });

    it('renders lines with quantity, totals, gift info and subtotal', async () => {
        mockCart(cartFixture);
        const wrapper = await mountSuspended(CartPage);
        const text = wrapper.text();
        expect(text).toContain('Amarone della Valpolicella 2019');
        expect(text).toContain('Qty 2');
        expect(text).toContain('€85.00');
        expect(text).toContain('Gift wrapped');
        expect(text).toContain('Happy birthday!');
        expect(text).toContain('Subtotal: €85.00');
    });

    it('does not show the gift chip for lines without gift attributes', async () => {
        mockCart({
            ...cartFixture,
            lines: [{ ...cartFixture.lines[0]!, attributes: [] }]
        });
        const wrapper = await mountSuspended(CartPage);
        expect(wrapper.text()).not.toContain('Gift wrapped');
    });
});
