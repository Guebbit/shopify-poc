<script setup lang="ts">
/*
 * Cart page: loads the persisted cart and renders lines via CartLineItem
 * (gift wrap flag and message decoded from line attributes there).
 */
const { t, locale } = useI18n();
const localePath = useLocalePath();
const formatMoney = useFormatMoney();
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
        <h1 class="mb-6 text-2xl font-medium text-neutral-900 sm:text-3xl">
            {{ t('cart.title') }}
        </h1>

        <p v-if="pending" class="py-12 text-center text-neutral-500">{{ t('cart.loading') }}</p>
        <p
            v-else-if="error"
            class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
        >
            {{ t('cart.loadError', { message: error.message }) }}
        </p>
        <p
            v-else-if="!cart || cart.lines.length === 0"
            class="rounded-xl bg-white px-6 py-12 text-center text-neutral-500 shadow-sm"
        >
            {{ t('cart.empty') }} —
            <NuxtLink :to="localePath('index')" class="font-semibold text-primary underline">
                {{ t('cart.backToProduct') }}
            </NuxtLink>
        </p>

        <!-- Material card: lines list + subtotal footer, elevation 1. -->
        <div v-else-if="cart" class="overflow-hidden rounded-xl bg-white shadow-sm">
            <ul class="divide-y divide-neutral-200">
                <CartLineItem v-for="line in cart.lines" :key="line.id" :line="line" />
            </ul>
            <p
                class="border-t border-neutral-200 bg-neutral-50 px-4 py-4 text-right font-semibold text-neutral-900 sm:px-6"
            >
                {{ t('cart.subtotal', { amount: formatMoney(cart.subtotal) }) }}
            </p>
        </div>
    </section>
</template>
