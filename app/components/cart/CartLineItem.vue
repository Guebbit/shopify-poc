<script setup lang="ts">
/*
 * Single cart line: image, title, vendor, quantity/price, and the gift wrap
 * chip decoded from the line's attributes.
 */
import type { CartLine } from '@api';

const { t } = useI18n();
const formatMoney = useFormatMoney();

const { line } = defineProps<{ line: CartLine }>();

const gift = computed(() => parseGiftAttributes(line.attributes));
</script>

<template>
    <li class="flex gap-4 p-4 sm:p-6">
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
                v-if="gift.isGiftWrapped"
                class="mt-1 w-fit rounded-full bg-primary/10 px-3 py-1 text-sm text-primary-dark"
            >
                🎁 {{ t('cart.giftWrapped') }}
                <em v-if="gift.giftMessage">— “{{ gift.giftMessage }}”</em>
            </p>
        </div>
    </li>
</template>
