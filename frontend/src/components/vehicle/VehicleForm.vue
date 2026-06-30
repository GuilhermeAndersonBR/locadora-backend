<script setup lang="ts">
import { useForm, Field as VeeField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { onMounted, ref } from "vue";

import z from "zod";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";
import BaseImageInput from "@/components/forms/BaseImageInput.vue";

import AppSelect from "@/components/app/AppSelect.vue";

import RequestService from "@/services/request.service";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import { CreateVehicleRequestSchema } from "@locadora/shared/vehicle/request/create-vehicle.schema.ts";

import type {
    CreateCategoryResponse
} from "@locadora/shared/category/response/get-category.response.js";

const props = defineProps({

    title: {
        type: String,
        default: "Novo veículo"
    },

    description: {
        type: String,
        default: "Cadastre um novo veículo."
    },

    submit: {
        type: String,
        default: "Salvar"
    },

    loading: {
        type: Boolean,
        default: false
    },

    initialValues: {
        type: Object,
        default: () => ({})
    }

});

const emit = defineEmits<{
    submit: [any]
}>();

const {
    handleSubmit
} = useForm({

    initialValues: props.initialValues,

    validationSchema: toTypedSchema(

        CreateVehicleRequestSchema.and(

            z.object({

                file: z
                    .instanceof(File)
                    .optional()

            })

        )

    )

});

const onSubmit = handleSubmit(
    values => emit(
        "submit",
        values
    )
);

const categories = ref<any[]>([]);

onMounted(async () => {

    const result =
        await RequestService.request<
            CreateCategoryResponse
        >({

            method: "GET",

            url: "/category"

        });

    if(result?.success)
        categories.value =
            (result.data ?? []).map(
                category => ({
                    label: category.name,
                    value: category.id
                })
            );

});
</script>

<template>

    <Card
        class="
            mx-auto
            max-w-3xl
        "
    >

        <CardHeader>

            <CardTitle>
                {{ title }}
            </CardTitle>

            <CardDescription>
                {{ description }}
            </CardDescription>

        </CardHeader>

        <CardContent>

            <BaseForm
                :submit="submit"
                :loading="loading"
                @submit="onSubmit"
            >

                <VeeField
                    name="plate"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Placa"
                        placeholder="ABC1234"
                        mask="@@@####"
                    />
                </VeeField>

                <VeeField
                    name="brand"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Marca"
                    />
                </VeeField>

                <VeeField
                    name="model"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Modelo"
                    />
                </VeeField>

                <VeeField
                    name="year"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Ano"
                        type="number"
                    />
                </VeeField>

                <VeeField
                    name="daily_rate"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Diária"
                        type="number"
                    />
                </VeeField>

                <VeeField
                    name="category_id"
                    v-slot="{
                        field,
                        handleChange,
                        errors
                    }"
                >
                    <AppSelect
                        numeric
                        :field="field"
                        :modelValue="field.value"
                        :errors="errors"
                        label="Categoria"
                        :options="categories"
                        @update:model-value="
                            handleChange
                        "
                    />
                </VeeField>

                <VeeField
                    name="file"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseImageInput
                        :field="field"
                        :errors="errors"
                        label="Imagem"
                    />
                </VeeField>

            </BaseForm>

        </CardContent>

    </Card>

</template>