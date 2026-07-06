<script setup lang="ts">
/*
 * App shell: Callmewine header shared by PDP and cart page.
 * Cart is fetched once on mount so the header badge survives reloads;
 * failures are ignored, the badge is not critical.
 */
import { useI18n } from 'vue-i18n';
import { changeLanguage, getCurrentLocale, supportedLanguages } from '~/utils/i18n';

const { t } = useI18n();
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

/*
 * Language switcher model: reads the active locale, writes via changeLanguage
 * (lazy-loads the vocabulary on first use).
 */
const language = computed({
    get: getCurrentLocale,
    set: (locale: string) => void changeLanguage(locale)
});

onMounted(() => {
    cartStore.fetchCart().catch(() => {});
});
</script>

<template>
    <div class="min-h-screen bg-neutral-100 font-sans text-neutral-900 antialiased">
        <NuxtRouteAnnouncer />
        <!-- Material app bar: primary surface, elevation 4, sticky. -->
        <header
            class="sticky top-0 z-10 flex items-center justify-between bg-primary px-4 py-3 shadow-md sm:px-6"
        >
            <NuxtLink
                to="/"
                class="rounded transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
                <img
                    class="block h-8"
                    src="https://cdn.shopify.com/s/files/1/0656/7824/6108/files/logo-callmewine-white.svg?v=1688664490"
                    alt="Callmewine"
                />
            </NuxtLink>
            <nav class="flex items-center gap-2 sm:gap-4">
                <select
                    v-model="language"
                    class="cursor-pointer rounded border border-white/40 bg-transparent px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white [&>option]:text-neutral-900"
                    :aria-label="t('header.language')"
                >
                    <option v-for="locale in supportedLanguages" :key="locale" :value="locale">
                        {{ locale.toUpperCase() }}
                    </option>
                </select>
                <!-- Material text button on dark surface, with cart count badge. -->
                <NuxtLink
                    to="/cart"
                    class="flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                >
                    {{ t('header.cart') }}
                    <span
                        v-if="cart?.totalQuantity"
                        class="inline-flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-xs font-bold text-primary"
                    >
                        {{ cart.totalQuantity }}
                    </span>
                </NuxtLink>
            </nav>
        </header>
        <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <NuxtPage />
        </main>
    </div>
</template>
