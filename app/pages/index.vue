<script setup lang="ts">
/*
 * PDP: fetches the configured Shopify product; ProductCard renders it and
 * the add-to-cart form (gift wrap + message stored as cart line attributes).
 */
import type { CartLineAttribute } from '@api';

const { t, locale } = useI18n();
const { fetchProduct } = useProduct();
const cartStore = useCartStore();

// Catalog read: safe to serve from the session cache for a few minutes.
const PRODUCT_TTL_MS = 5 * 60_000;

// Locale-scoped key: product data is fetched @inContext, so each language
// caches its own payload and a locale switch triggers a refetch.
const {
    data: product,
    pending,
    error
} = useCachedAsyncData(() => `pdp-product:${locale.value}`, fetchProduct, PRODUCT_TTL_MS);

const adding = ref(false);
const added = ref(false);
const addError = ref<string | undefined>();

/*
 * Add the product variant to the cart with the gift attributes from the card.
 */
const onAddToCart = (attributes: CartLineAttribute[]): void => {
    if (!product.value) return;
    adding.value = true;
    added.value = false;
    addError.value = undefined;
    cartStore
        .addToCart(product.value.variant.id, attributes)
        .then(() => {
            added.value = true;
        })
        .catch((error: unknown) => {
            addError.value = error instanceof Error ? error.message : t('product.addError');
        })
        .finally(() => {
            adding.value = false;
        });
};
</script>

<template>
    <section>
        <p v-if="pending" class="py-12 text-center text-neutral-500">
            {{ t('product.loading') }}
        </p>
        <p
            v-else-if="error"
            class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
        >
            {{ t('product.loadError', { message: error.message }) }}
        </p>
        <ProductCard
            v-else-if="product"
            :product="product"
            :adding="adding"
            :added="added"
            :add-error="addError"
            @add-to-cart="onAddToCart"
        />
    </section>
</template>
