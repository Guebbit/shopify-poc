<script setup lang="ts">
/*
 * Callmewine header shared by PDP and cart page: logo, language switcher,
 * cart link with count badge.
 * Cart is fetched once on mount so the badge survives reloads;
 * failures are ignored, the badge is not critical.
 */
const { t } = useI18n();
const localePath = useLocalePath();
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

onMounted(() => {
    cartStore.fetchCart().catch(() => {});
});
</script>

<template>
    <!-- Material app bar: primary surface, elevation 4, sticky. -->
    <header
        class="sticky top-0 z-10 flex items-center justify-between bg-primary px-4 py-3 shadow-md sm:px-6"
    >
        <NuxtLink
            :to="localePath('index')"
            class="rounded transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
            <img
                class="block h-8"
                src="https://cdn.shopify.com/s/files/1/0656/7824/6108/files/logo-callmewine-white.svg?v=1688664490"
                alt="Callmewine"
            />
        </NuxtLink>
        <nav class="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <!-- Material text button on dark surface, with cart count badge. -->
            <NuxtLink
                :to="localePath('cart')"
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
</template>
