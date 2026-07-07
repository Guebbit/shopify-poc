<script setup lang="ts">
/*
 * Gift wrap checkbox + optional message for the PDP add-to-cart form.
 * The message field only appears once gift wrap is checked.
 */
const { t } = useI18n();

const giftWrap = defineModel<boolean>('giftWrap', { required: true });
const giftMessage = defineModel<string>('giftMessage', { required: true });
</script>

<template>
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
</template>
