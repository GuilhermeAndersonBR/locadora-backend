<script setup lang="ts">
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input }
    from "@/components/ui/input";

defineProps<{
    form: any;
    name: string;
    label: string;
    placeholder?: string;
}>();
</script>

<template>
    <FormField
        v-slot="{ componentField }"
        :name="name"
    >
        <FormItem>

            <FormLabel>
                {{ label }}
            </FormLabel>

            <FormControl>
                <Input
                    :placeholder="
                        placeholder
                    "
                    v-bind="
                        componentField
                    "
                />
            </FormControl>

            <FormMessage />

        </FormItem>
    </FormField>
</template>