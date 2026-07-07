import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import App from '../../app/app.vue';

// vi.hoisted: mockNuxtImport factories are hoisted above imports,
// so they may only reference hoisted bindings.
const { useCartStoreMock, useStoreLocalizationMock } = vi.hoisted(() => ({
    useCartStoreMock: vi.fn(),
    useStoreLocalizationMock: vi.fn()
}));

mockNuxtImport('useCartStore', () => useCartStoreMock);
mockNuxtImport('useStoreLocalization', () => useStoreLocalizationMock);

beforeEach(() => {
    // Both network seams stubbed: the app shell must not call Shopify from a unit test.
    useCartStoreMock.mockReturnValue({
        cart: ref(undefined),
        fetchCart: () => Promise.resolve(undefined),
        syncBuyerIdentity: () => Promise.resolve()
    });
    useStoreLocalizationMock.mockReturnValue({
        fetchAvailableLanguages: () =>
            Promise.resolve([
                { isoCode: 'EN', endonymName: 'English' },
                { isoCode: 'IT', endonymName: 'Italiano' }
            ])
    });
});

describe('App', () => {
    it('renders the shell: header logo, language switcher and cart link', async () => {
        const wrapper = await mountSuspended(App);
        expect(wrapper.find('header img[alt="Callmewine"]').exists()).toBe(true);
        expect(wrapper.find('header select').exists()).toBe(true);
        expect(wrapper.find('header a[href="/cart"]').exists()).toBe(true);
    });

    it('offers only the store-published languages, labeled by endonym, keeping the active locale', async () => {
        const wrapper = await mountSuspended(App);
        const options = wrapper.findAll('header select option').map((option) => option.text());
        expect(options).toEqual(['English', 'Italiano']);
    });
});
