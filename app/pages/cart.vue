<script setup lang="ts">
/*
 * Cart page: loads the persisted cart and renders lines via CartLineItem
 * (gift wrap flag and message decoded from line attributes there).
 */
const { t, locale } = useI18n();
const localePath = useLocalePath();
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

// Cart is always network: totals and availability change server-side,
// so its freshness window is zero (Nuxt would otherwise reuse the payload across visits).
const CART_TTL_MS = 0;

// Locale-scoped key: a language switch refetches so line titles/pricing follow @inContext.
const { pending, error } = useCachedAsyncData(
    () => `cart:${locale.value}`,
    cartStore.fetchCart,
    CART_TTL_MS
);
</script>

<template>
    <section>
        <UiPageTitle>{{ t('cart.title') }}</UiPageTitle>

        <UiPageLoading v-if="pending">{{ t('cart.loading') }}</UiPageLoading>
        <UiAlert v-else-if="error" variant="error">
            {{ t('cart.loadError', { message: error.message }) }}
        </UiAlert>
        <UiAlert v-else-if="!cart || cart.lines.length === 0" variant="info">
            {{ t('cart.empty') }} —
            <NuxtLink :to="localePath('index')" class="font-semibold text-primary underline">
                {{ t('cart.backToProduct') }}
            </NuxtLink>
        </UiAlert>

        <CartSummary v-else-if="cart" :cart="cart" />
    </section>
</template>
