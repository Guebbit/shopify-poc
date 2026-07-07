import type { CountryCode, LanguageCode } from '@api/graphql';

/*
 * Storefront API @inContext variables derived from the active i18n locale.
 * The locale's BCP 47 tag (e.g. "it-IT") splits into Shopify's LanguageCode
 * and CountryCode; Shopify falls back to the shop default when the country
 * is not an enabled market, so the cast is safe for any well-formed tag.
 * Reads $i18n from the nuxt app (not useI18n) so it also works inside
 * Pinia store setups, outside component injection scope.
 * @returns computed { language, country } to spread into query variables
 */
export const useShopifyContext = () => {
    const { $i18n } = useNuxtApp();
    return computed(() => {
        const [language, country] = ($i18n.localeProperties.value.language ?? 'en-US').split('-');
        return {
            language: (language ?? 'EN').toUpperCase() as LanguageCode,
            country: (country ?? 'US').toUpperCase() as CountryCode
        };
    });
};
