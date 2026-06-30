<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { FieldError } from "@/components/ui/field";
import TranslationService from "@/services/translation.service";
import type { FieldBindingObject } from "vee-validate";

export interface SelectOption {

    label: string;

    value: string | number;

}

const props = defineProps<{

    field: FieldBindingObject<any>;

    modelValue?: string | number;

    numeric?: boolean;

    label?: string;

    placeholder?: string;

    disabled?: boolean;

    errors?: string[];

    options: SelectOption[];

}>();

console.log(props.options);

const emit = defineEmits<{

    "update:modelValue":
        [string | number];

}>();
</script>

<template>

    <div class="space-y-2">

        <label
            v-if="label"
            class="
                text-sm
                font-medium
            "
        >
            {{ label }}
        </label>

        <Select

            :model-value="
                props.modelValue?.toString()
            "

            :disabled="
                props.disabled
            "

            @update:model-value="
                value =>
                    emit(
                        'update:modelValue',
                        props.numeric ?
                            Number(value) :
                            value as string | number
                    )
            "

        >

            <SelectTrigger
                :aria-invalid="
                    !!props.errors?.length
                "
            >

                <SelectValue
                    :placeholder="
                        placeholder ??
                        'Selecione'
                    "
                />

            </SelectTrigger>

            <SelectContent>

                <SelectGroup>

                    <SelectItem

                        v-for="
                            option
                            in options
                        "

                        :key="
                            option.value
                        "

                        :value="
                            option.value
                                .toString()
                        "

                    >
                        {{
                            option.label
                        }}
                    </SelectItem>

                </SelectGroup>

            </SelectContent>

        </Select>

        <FieldError
            v-if="errors?.length"
            :errors="errors.map(
                TranslationService.translate
            )"
        />

    </div>

</template>