<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { vMaska } from "maska/vue";

defineProps<{
    modelValue?: string | number;
    label?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    errors?: string[];
    mask?: string;
}>();

defineEmits<{
    "update:modelValue": [string];
}>();
</script>

<template>
    <div>

        <label
            v-if="label"
            class="
                text-sm
                font-medium
            "
        >
            {{ label }}
        </label>

        <Input
            :model-value="modelValue"
            :type="type ?? 'text'"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-invalid="!!errors?.length"
            v-maska="mask"
            @update:model-value="
                $emit(
                    'update:modelValue',
                    $event as string
                )
            "
        />

        <FieldError
            v-if="errors?.length"
            :errors="errors"
        />

    </div>
</template>