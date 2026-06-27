<script setup lang="ts">
    import { Input } from "@/components/ui/input";

    defineProps<{
        modelValue?: string;
        label: string;
        placeholder?: string;
        description?: string;
        error?: string;
        type?: string;
    }>();

    const emit =
        defineEmits<{
        "update:modelValue": [value: string | number];
    }>();
</script>

<template>
    <div class="space-y-2">

        <label class="text-sm font-medium">
            {{ label }}
        </label>

        <Input
            :type="type ?? 'text'"
            :placeholder="placeholder"
            :model-value="modelValue"
            @update:model-value="
                emit(
                    'update:modelValue',
                    $event
                )
            "
        />

        <p
            v-if="description"
            class="text-muted-foreground text-sm"
        >
            {{ description }}
        </p>

        <p
            v-if="error"
            class="text-sm text-red-500"
        >
            {{ error }}
        </p>

    </div>
</template>