<script setup lang="ts">
/*
 * Add-to-cart button for the PDP: label and disabled state follow the
 * pending/sold-out/available states, styled as a Material contained button.
 */
const { t } = useI18n();

defineProps<{
    adding: boolean;
    availableForSale: boolean;
}>();

defineEmits<{ click: [] }>();
</script>

<template>
    <!-- Material contained button: uppercase label, elevation on hover. -->
    <button
        type="button"
        class="rounded-full bg-primary px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase shadow-md transition-all hover:bg-primary-dark hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:shadow-sm disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none"
        :disabled="adding || !availableForSale"
        @click="$emit('click')"
    >
        {{
            adding
                ? t('product.adding')
                : availableForSale
                  ? t('product.addToCart')
                  : t('product.soldOut')
        }}
    </button>
</template>
