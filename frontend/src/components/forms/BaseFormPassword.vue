<script setup lang="ts">
import { ref } from "vue";
import type { FieldBindingObject } from "vee-validate";

import {
    Field,
    FieldError,
    FieldLabel
} from "@/components/ui/field";

import {
    Input
} from "@/components/ui/input";

import {
    Button
} from "@/components/ui/button";

import {
    Eye,
    EyeOff
} from "@lucide/vue";
import AppTooltip from "../app/AppTooltip.vue";
import TranslationService from "@/services/translation.service.ts";

const props = defineProps<{

    field: FieldBindingObject<any>;

    errors?: string[];

    label: string;

    placeholder?: string;

}>();

const visible = ref(false);
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

        <div class="relative">

            <Input
                v-bind="props.field"
                :type="
                    visible
                        ? 'text'
                        : 'password'
                "
                :placeholder="
                    props.placeholder
                "
                :aria-invalid="
                    !!props.errors?.length
                "
                class="pr-10"
            />

            <AppTooltip
                :text="
                    visible
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                "
            >

                <Button
                    :aria-label="
                        visible
                            ? 'Ocultar senha'
                            : 'Mostrar senha'
                    "
                    type="button"
                    variant="ghost"
                    size="icon"
                    class="
                        absolute
                        top-1/2
                        right-1
                        -translate-y-1/2
                        h-8
                        w-8
                    "
                    @click="
                        visible = !visible
                    "
                >

                    <Eye
                        v-if="!visible"
                        class="size-4"
                    />

                    <EyeOff
                        v-else
                        class="size-4"
                    />

                </Button>

            </AppTooltip>

        </div>

        <FieldError
            v-if="
                props.errors?.length
            "
            :errors="
                props.errors.map(TranslationService.translate)
            "
        />

    </Field>
</template>