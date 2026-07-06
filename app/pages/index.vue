<script setup lang="ts">
/*
 * PDP: renders the configured Shopify product and the add-to-cart form
 * with optional gift wrap + message (stored as cart line attributes).
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { fetchProduct } = useProduct();
const cartStore = useCartStore();

// Catalog read: safe to serve from the session cache for a few minutes.
const PRODUCT_TTL_MS = 5 * 60_000;

const {
    data: product,
    pending,
    error
} = useCachedAsyncData('pdp-product', fetchProduct, PRODUCT_TTL_MS);

const giftWrap = ref(false);
const giftMessage = ref('');
const adding = ref(false);
const added = ref(false);
const addError = ref<string | undefined>();

/*
 * Add the product variant to the cart, attaching gift attributes when requested.
 */
function onAddToCart(): void {
    if (!product.value) return;
    adding.value = true;
    added.value = false;
    addError.value = undefined;
    cartStore
        .addToCart(product.value.variant.id, buildGiftAttributes(giftWrap.value, giftMessage.value))
        .then(() => {
            added.value = true;
        })
        .catch((error: unknown) => {
            addError.value = error instanceof Error ? error.message : t('product.addError');
        })
        .finally(() => {
            adding.value = false;
        });
}
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

        <!-- Material card, elevation 1, split media/info on desktop. -->
        <article
            v-else-if="product"
            class="grid overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-2"
        >
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

                <!-- Gift options in an outlined Material group. -->
                <div class="rounded-lg border border-neutral-200 p-4">
                    <label class="flex cursor-pointer items-center gap-3 select-none">
                        <input
                            v-model="giftWrap"
                            type="checkbox"
                            class="size-5 cursor-pointer accent-primary"
                        />
                        <span class="font-medium">🎁 {{ t('product.giftWrap') }}</span>
                    </label>

                    <label v-if="giftWrap" class="mt-4 block">
                        <span class="mb-1 block text-sm font-medium text-neutral-600">
                            {{ t('product.giftMessage') }}
                        </span>
                        <textarea
                            v-model="giftMessage"
                            rows="3"
                            maxlength="250"
                            :placeholder="t('product.giftMessagePlaceholder')"
                            class="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm transition-colors placeholder:text-neutral-400 focus:border-primary focus:outline-2 focus:outline-primary/30"
                        ></textarea>
                    </label>
                </div>

                <!-- Material contained button: uppercase label, elevation on hover. -->
                <button
                    type="button"
                    class="rounded-full bg-primary px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase shadow-md transition-all hover:bg-primary-dark hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:shadow-sm disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none"
                    :disabled="adding || !product.variant.availableForSale"
                    @click="onAddToCart"
                >
                    {{
                        adding
                            ? t('product.adding')
                            : product.variant.availableForSale
                              ? t('product.addToCart')
                              : t('product.soldOut')
                    }}
                </button>

                <p
                    v-if="added"
                    class="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                >
                    {{ t('product.added') }} —
                    <NuxtLink to="/cart" class="font-semibold underline">
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
    </section>
</template>
