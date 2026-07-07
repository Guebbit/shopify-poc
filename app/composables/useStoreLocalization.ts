import { LocalizationDocument, type LanguageCode } from '@api/graphql';

/*
 * A store-published language and its endonym (native-language name, e.g. "Italiano"),
 * used as the language switcher's option label.
 */
export type StoreLanguage = {
    isoCode: LanguageCode;
    endonymName: string;
};

/*
 * Reads the store's published Shopify Markets localization.
 * The i18n locale list in nuxt.config is the superset the app can render;
 * this narrows the language switcher to what the catalog actually translates.
 * @returns fetchAvailableLanguages returning the store's StoreLanguage list
 */
export const useStoreLocalization = () => {
    const { $shopify } = useNuxtApp();

    /*
     * Fetch the languages published across every market, deduped by isoCode.
     * Reading all `availableCountries` (rather than the active-country-only
     * `availableLanguages`) keeps the list independent of the geo-IP guess
     * Shopify makes for the caller's country when no @inContext is pinned.
     * @returns StoreLanguage list; empty when the store reports none
     */
    const fetchAvailableLanguages = (): Promise<StoreLanguage[]> => {
        return $shopify.query({ query: LocalizationDocument }).then(({ data }) => {
            const countries = data?.localization.availableCountries ?? [];
            const byIsoCode = new Map<string, StoreLanguage>();
            for (const { availableLanguages } of countries) {
                for (const language of availableLanguages) {
                    byIsoCode.set(language.isoCode, language);
                }
            }
            // eslint-disable-next-line unicorn/prefer-iterator-to-array
            return [...byIsoCode.values()];
        });
    };

    return { fetchAvailableLanguages };
};
