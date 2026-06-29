<script setup lang="ts">
defineProps<{
    title: string;
    value: string | number;
}>();
</script>

<template>
    <div
        class="
            rounded-lg
            border
            p-6
        "
    >
        <p class="text-muted-foreground">
            {{ title }}
        </p>

        <h3
            class="
                mt-2
                text-3xl
                font-bold
            "
        >
            {{ value }}
        </h3>
    </div>
</template>