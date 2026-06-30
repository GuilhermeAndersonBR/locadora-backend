<script setup lang="ts">
import { type FieldBindingObject } from "vee-validate";
import { vMaska } from "maska/vue";

import {
    Field,
    FieldError,
    FieldLabel
} from "@/components/ui/field";

import {
    Input
} from "@/components/ui/input";
import TranslationService from "@/services/translation.service";

const props = defineProps<{

    field: FieldBindingObject<any>;

    errors?: string[];

    label: string;

    type?: string;

    placeholder?: string;

    mask?: string;

}>();
</script>

<template>
    <Field
        :data-invalid="
            !!props.errors?.length
        "
    >

        <FieldLabel>
            {{ props.label }}
        </FieldLabel>

        <Input
            v-maska="mask"
            v-bind="props.field"
            :type="props.type"
            :placeholder="props.placeholder"
            :aria-invalid="
                !!props.errors?.length
            "
        />

        <FieldError
            v-if="props.errors?.length"
            :errors="props.errors.map(
                TranslationService.translate
            )"
        />

    </Field>
</template>