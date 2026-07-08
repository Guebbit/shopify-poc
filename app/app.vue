<script setup lang="ts">
/*
 * App shell: layout + app-wide i18n side effects.
 * Header UI lives in AppHeader / LanguageSwitcher.
 */
const { t, locale } = useI18n();
const cartStore = useCartStore();

// <html lang> + hreflang/og:locale meta: not automatic, must be wired per the module's SEO guide.
const i18nHead = useLocaleHead();
useHead(() => ({
    htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
    link: i18nHead.value.link,
    meta: i18nHead.value.meta,
    // Site-wide fallback title/suffix; pages set their own <title> which wins over this default.
    titleTemplate: (title) => (title ? `${title} — ${t('seo.siteName')}` : t('seo.siteName'))
}));

// Default meta description (PageSpeed requires one on every page); pages override with
// something more specific once their data loads.
useSeoMeta({
    description: () => t('seo.defaultDescription')
});

// Language switch: re-pin the cart to the new locale's market (pricing, checkout
// language). Non-critical: locale-keyed pages refetch anyway.
watch(locale, () => {
    cartStore.syncBuyerIdentity().catch(() => {});
});
</script>

<template>
    <div class="min-h-screen bg-neutral-100 font-sans text-neutral-900 antialiased">
        <NuxtRouteAnnouncer />
        <LayoutAppHeader />
        <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <NuxtPage />
        </main>
    </div>
</template>
