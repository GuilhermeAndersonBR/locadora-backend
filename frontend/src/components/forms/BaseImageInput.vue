<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { Button } from "@/components/ui/button";

import {
    Field,
    FieldError,
    FieldLabel
} from "@/components/ui/field";

import {
    Upload,
    X
} from "@lucide/vue";
import type { FieldBindingObject } from "vee-validate";
import TranslationService from "@/services/translation.service";

const props = withDefaults(
    defineProps<{

        field: FieldBindingObject<any>;

        errors?: string[];

        label: string;

        modelValue?: File | null;

        preview?: string;

        accept?: string;

        rounded?: boolean;

    }>(),
    {
        accept: "image/*",
        rounded: false
    }
);

const emit =
    defineEmits<{

        (
            event: "update:modelValue",
            value: File | undefined
        ): void;

    }>();

const selectedPreview =
    ref<string>();

watch(
    () => props.preview,
    () => {
        selectedPreview.value =
            undefined;
    }
);

const currentPreview = computed(
    () =>
        selectedPreview.value
        ?? props.preview
);

function change(
    event: Event
) {

    const target = event.target as HTMLInputElement;

    const file =
        target.files?.[0];

    if(!file)
        return;

    props.field.onChange(
        file
    );

    emit(
        "update:modelValue",
        file
    );

    selectedPreview.value =
        URL.createObjectURL(
            file
        );

}

function remove() {

    props.field.onChange(
        undefined
    );

    emit(
        "update:modelValue",
        undefined
    );

    selectedPreview.value =
        undefined;

}
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

        <div
            class="
                flex
                flex-col
                gap-4
                items-center
            "
        >

            <div
                class="
                    relative
                    h-32
                    w-32
                    border
                    overflow-hidden
                "
                :class="
                    rounded
                        ? 'rounded-full'
                        : 'rounded-lg'
                "
            >

                <img
                    v-if="
                        selectedPreview
                    "
                    :src="
                        selectedPreview
                    "
                    class="
                        h-full
                        w-full
                        object-cover
                    "
                />

                <div
                    v-else
                    class="
                        select-none
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-muted-foreground
                    "
                >
                    Sem imagem
                </div>

            </div>

            <div
                class="
                    flex
                    gap-2
                "
            >

                <Button
                    as-child
                    variant="outline"
                >

                    <label
                        class="cursor-pointer"
                    >

                        <Upload
                            class="mr-2 h-4 w-4"
                        />

                        Selecionar

                        <input
                            hidden
                            type="file"
                            :accept="accept"
                            @change="change"
                        />

                    </label>

                </Button>

                <Button
                    v-if="
                        selectedPreview
                    "
                    variant="destructive"
                    @click="
                        remove
                    "
                >

                    <X
                        class="
                            h-4
                            w-4
                        "
                    />

                </Button>

            </div>

        </div>

        <FieldError
            v-if="props.errors?.length"
            :errors="
                props.errors.map(
                    TranslationService.translate
                )
            "
        />

    </Field>

</template>