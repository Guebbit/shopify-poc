<script setup lang="ts">
/*
 * Product card for the PDP: media/info split, gift options and add-to-cart.
 * Add-to-cart lifecycle (pending/success/error) is owned by the page since it
 * drives the cart mutation; this card only emits the gift attributes to add.
 */
import type { CartLineAttribute, Product } from '@api';

const { t } = useI18n();
const localePath = useLocalePath();
const formatMoney = useFormatMoney();

defineProps<{
    product: Product;
    adding: boolean;
    added: boolean;
    addError?: string;
}>();

const emit = defineEmits<{ addToCart: [attributes: CartLineAttribute[]] }>();

const giftWrap = ref(false);
const giftMessage = ref('');

const onAddToCart = (): void => {
    emit('addToCart', buildGiftAttributes(giftWrap.value, giftMessage.value));
};
</script>

<template>
    <!-- Material card, elevation 1, split media/info on desktop. -->
    <article class="grid overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-2">
        <div class="flex items-center justify-center bg-neutral-50 p-6">
            <img
                v-if="product.image"
                class="max-h-[28rem] w-full object-contain"
                :src="product.image.url"
                :alt="product.image.altText ?? product.title"
            />
            <p v-else class="text-neutral-400">{{ t('product.noImage') }}</p>
        </div>

        <div class="flex flex-col gap-4 p-6 sm:p-8">
            <div>
                <p class="text-xs font-semibold tracking-widest text-primary uppercase">
                    {{ product.vendor }}
                </p>
                <h1 class="mt-1 text-2xl font-medium text-neutral-900 sm:text-3xl">
                    {{ product.title }}
                </h1>
            </div>

            <p class="flex items-baseline gap-3">
                <span class="text-2xl font-bold text-neutral-900">
                    {{ formatMoney(product.variant.price) }}
                </span>
                <s v-if="product.variant.compareAtPrice" class="text-lg text-neutral-400">
                    {{ formatMoney(product.variant.compareAtPrice) }}
                </s>
            </p>

            <ProductGiftOptions v-model:gift-wrap="giftWrap" v-model:gift-message="giftMessage" />

            <ProductAddToCartButton
                :adding="adding"
                :available-for-sale="product.variant.availableForSale"
                @click="onAddToCart"
            />

            <p
                v-if="added"
                class="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            >
                {{ t('product.added') }} —
                <NuxtLink :to="localePath('cart')" class="font-semibold underline">
                    {{ t('product.viewCart') }}
                </NuxtLink>
            </p>
            <p
                v-if="addError"
                class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
                {{ addError }}
            </p>
        </div>
    </article>
</template>
