<script setup lang="ts">
defineProps<{
    status: string;
}>();
</script>

<template>
    <span
        v-if="
            status ===
            'AVAILABLE'
        "
        class="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-medium
            text-green-700
        "
    >
        Disponível
    </span>

    <span
        v-else-if="
            status ===
            'RENTED'
        "
        class="
            rounded-full
            bg-red-100
            px-3
            py-1
            text-xs
            font-medium
            text-red-700
        "
    >
        Alugado
    </span>

    <span
        v-else
        class="
            rounded-full
            bg-yellow-100
            px-3
            py-1
            text-xs
            font-medium
            text-yellow-700
        "
    >
        Manutenção
    </span>
</template>