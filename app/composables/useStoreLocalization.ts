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
     * Fetch the languages published on the current market.
     * @returns StoreLanguage list; empty when the store reports none
     */
    const fetchAvailableLanguages = (): Promise<StoreLanguage[]> => {
        return $shopify
            .query({ query: LocalizationDocument })
            .then(({ data }) => data?.localization.availableLanguages ?? []);
    };

    return { fetchAvailableLanguages };
};
