<script setup lang="ts">
/*
 * Cart page: loads the persisted cart and renders lines
 * including gift wrap flag and gift message from line attributes.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

// Cart is always network: totals and availability change server-side,
// and Nuxt 4 would otherwise reuse the payload across visits.
const { pending, error } = useAsyncData('cart', cartStore.fetchCart, {
    getCachedData: () => {}
});

/*
 * View model: contract cart lines with gift info decoded from line attributes.
 */
const lines = computed(
    () =>
        cart.value?.lines.map((line) => ({ ...line, ...parseGiftAttributes(line.attributes) })) ??
        []
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
            v-else-if="lines.length === 0"
            class="rounded-xl bg-white px-6 py-12 text-center text-neutral-500 shadow-sm"
        >
            {{ t('cart.empty') }} —
            <NuxtLink to="/" class="font-semibold text-primary underline">
                {{ t('cart.backToProduct') }}
            </NuxtLink>
        </p>

        <!-- Material card: lines list + subtotal footer, elevation 1. -->
        <div v-else-if="cart" class="overflow-hidden rounded-xl bg-white shadow-sm">
            <ul class="divide-y divide-neutral-200">
                <li v-for="line in lines" :key="line.id" class="flex gap-4 p-4 sm:p-6">
                    <img
                        v-if="line.image"
                        :src="line.image.url"
                        :alt="line.title"
                        class="size-20 shrink-0 rounded-lg bg-neutral-50 object-contain"
                    />
                    <div class="flex flex-col gap-1">
                        <strong class="font-medium text-neutral-900">{{ line.title }}</strong>
                        <p class="text-xs font-semibold tracking-widest text-primary uppercase">
                            {{ line.vendor }}
                        </p>
                        <p class="text-sm text-neutral-600">
                            {{ t('cart.quantity', { count: line.quantity }) }} —
                            <span class="font-semibold text-neutral-900">
                                {{ formatMoney(line.lineTotal) }}
                            </span>
                        </p>
                        <!-- Gift wrap chip with the custom message. -->
                        <p
                            v-if="line.isGiftWrapped"
                            class="mt-1 w-fit rounded-full bg-primary/10 px-3 py-1 text-sm text-primary-dark"
                        >
                            🎁 {{ t('cart.giftWrapped') }}
                            <em v-if="line.giftMessage">— “{{ line.giftMessage }}”</em>
                        </p>
                    </div>
                </li>
            </ul>
            <p
                class="border-t border-neutral-200 bg-neutral-50 px-4 py-4 text-right font-semibold text-neutral-900 sm:px-6"
            >
                {{ t('cart.subtotal', { amount: formatMoney(cart.subtotal) }) }}
            </p>
        </div>
    </section>
</template>
