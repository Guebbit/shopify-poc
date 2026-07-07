import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { clearNuxtData } from '#app';
import PdpPage from '../../app/pages/index.vue';
import type { Product } from '@api';
import { GIFT_MESSAGE_ATTRIBUTE, GIFT_WRAP_ATTRIBUTE } from '../../app/utils/giftAttributes';

// vi.hoisted: mockNuxtImport factories are hoisted above imports,
// so they may only reference hoisted bindings.
const { useProductMock, useCartStoreMock } = vi.hoisted(() => ({
    useProductMock: vi.fn(),
    useCartStoreMock: vi.fn()
}));

mockNuxtImport('useProduct', () => useProductMock);
mockNuxtImport('useCartStore', () => useCartStoreMock);

const product: Product = {
    id: 'gid://shopify/Product/1',
    title: 'Amarone della Valpolicella 2019',
    vendor: 'Callmewine',
    image: { url: 'https://example.com/wine.jpg', altText: 'Bottle' },
    variant: {
        id: 'gid://shopify/ProductVariant/11',
        availableForSale: true,
        price: { amount: '42.5', currencyCode: 'EUR' },
        compareAtPrice: { amount: '49.9', currencyCode: 'EUR' }
    }
};

const addToCart = vi.fn();
// Single stable handler: useAsyncData keeps the first handler per key across mounts,
// so tests reprogram this fn instead of returning a new fetchProduct per test.
const fetchProduct = vi.fn();

beforeEach(() => {
    // useAsyncData caches by key across mounts: reset between tests.
    clearNuxtData();
    addToCart.mockReset().mockResolvedValue(undefined);
    fetchProduct.mockReset().mockResolvedValue(product);
    useProductMock.mockReturnValue({ fetchProduct });
    // PDP only adds to the cart; badge/cart reads live in the app shell.
    useCartStoreMock.mockReturnValue({ addToCart });
});

describe('PDP page', () => {
    it('renders title, vendor, price and compare-at price', async () => {
        const wrapper = await mountSuspended(PdpPage);
        expect(wrapper.find('h1').text()).toBe('Amarone della Valpolicella 2019');
        expect(wrapper.text()).toContain('Callmewine');
        expect(wrapper.text()).toContain('€42.50');
        expect(wrapper.find('s').text()).toContain('€49.90');
    });

    it('reveals the gift message field only when gift wrap is checked', async () => {
        const wrapper = await mountSuspended(PdpPage);
        expect(wrapper.find('textarea').exists()).toBe(false);
        await wrapper.find('input[type="checkbox"]').setValue(true);
        expect(wrapper.find('textarea').exists()).toBe(true);
    });

    it('adds the variant with gift attributes and shows the confirmation', async () => {
        const wrapper = await mountSuspended(PdpPage);
        await wrapper.find('input[type="checkbox"]').setValue(true);
        await wrapper.find('textarea').setValue('  Happy birthday  ');
        await wrapper.find('button').trigger('click');
        await flushPromises();

        expect(addToCart).toHaveBeenCalledWith('gid://shopify/ProductVariant/11', [
            { key: GIFT_WRAP_ATTRIBUTE, value: 'true' },
            { key: GIFT_MESSAGE_ATTRIBUTE, value: 'Happy birthday' }
        ]);
        expect(wrapper.text()).toContain('Added to cart');
    });

    it('adds without attributes when gift wrap is off', async () => {
        const wrapper = await mountSuspended(PdpPage);
        await wrapper.find('button').trigger('click');
        await flushPromises();
        expect(addToCart).toHaveBeenCalledWith('gid://shopify/ProductVariant/11', []);
    });

    it('disables the button and shows sold out when the variant is unavailable', async () => {
        fetchProduct.mockResolvedValue({
            ...product,
            variant: { ...product.variant, availableForSale: false }
        });
        const wrapper = await mountSuspended(PdpPage);
        const button = wrapper.find('button');
        expect(button.text()).toBe('Sold out');
        expect(button.attributes('disabled')).toBeDefined();
    });

    it('shows the load error when the product cannot be fetched', async () => {
        fetchProduct.mockRejectedValue(new Error('boom'));
        const wrapper = await mountSuspended(PdpPage);
        expect(wrapper.text()).toContain('Could not load the product');
        expect(wrapper.text()).toContain('boom');
    });
});
