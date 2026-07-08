<script setup lang="ts">
/*
 * Language switcher for the app header.
 * Offers only languages the store publishes (Shopify Markets); until the query
 * answers — or if it fails — falls back to the full configured list.
 */
const { t, locale, locales, setLocale } = useI18n();

const STORE_LANGUAGES_TTL_MS = 60 * 60_000;
const { fetchAvailableLanguages } = useStoreLocalization();
const { data: storeLanguages } = useCachedAsyncData(
    'store-languages',
    fetchAvailableLanguages,
    STORE_LANGUAGES_TTL_MS
);

/*
 * Switcher model: reads the active locale, writes via setLocale
 * (lazy-loads the vocabulary, updates the route prefix and the cookie).
 */
const language = computed({
    get: () => locale.value,
    set: (target) => void setLocale(target)
});

/*
 * Option list: code + label, narrowed to store-published languages.
 * Label prefers the store's endonym (native-language name) over the
 * configured `name`, so it follows the catalog's own translations.
 */
const languageOptions = computed(() => {
    const published = storeLanguages.value;
    const endonymOf = (code: string) =>
        published?.find(({ isoCode }) => isoCode === code.toUpperCase())?.endonymName;
    return locales.value
        .filter(
            ({ code }) =>
                // The active locale stays listed even if unpublished, so the select never shows a blank value.
                code === locale.value || !published?.length || endonymOf(code) !== undefined
        )
        .map(({ code, name }) => ({ code, label: endonymOf(code) ?? name ?? code }));
});
</script>

<template>
    <select
        v-model="language"
        class="cursor-pointer rounded border border-white/40 bg-transparent px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white [&>option]:text-neutral-900"
        :aria-label="t('header.language')"
    >
        <option v-for="l in languageOptions" :key="l.code" :value="l.code">
            {{ l.label }}
        </option>
    </select>
</template>
