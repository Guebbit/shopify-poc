<script setup lang="ts">
/*
 * Material card: lines list + subtotal footer, elevation 1.
 */
import type { Cart } from '@api';

const { t } = useI18n();
const formatMoney = useFormatMoney();

const { cart } = defineProps<{ cart: Cart }>();
</script>

<template>
    <div class="overflow-hidden rounded-xl bg-white shadow-sm">
        <ul class="divide-y divide-neutral-200">
            <CartLineItem v-for="line in cart.lines" :key="line.id" :line="line" />
        </ul>
        <p
            class="border-t border-neutral-200 bg-neutral-50 px-4 py-4 text-right font-semibold text-neutral-900 sm:px-6"
        >
            {{ t('cart.subtotal', { amount: formatMoney(cart.subtotal) }) }}
        </p>
    </div>
</template>
