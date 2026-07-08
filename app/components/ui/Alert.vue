<script setup lang="ts">
type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const VARIANT_CLASSES: Record<AlertVariant, string> = {
    info: 'border-neutral-200 bg-neutral-50 text-neutral-600',
    success: 'border-green-200 bg-green-50 text-green-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-800',
    error: 'border-red-200 bg-red-50 text-red-800'
};

const { variant = 'info' } = defineProps<{ variant?: AlertVariant }>();
</script>

<template>
    <p class="rounded-lg border px-4 py-3 text-center" :class="VARIANT_CLASSES[variant]">
        <slot />
    </p>
</template>
