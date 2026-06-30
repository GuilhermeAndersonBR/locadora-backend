<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

import { useForm, Field as VeeField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";
import BaseImageInput from "@/components/forms/BaseImageInput.vue";

import {
    UpdateVehicleRequestSchema
} from "@locadora/shared/vehicle/request/update-vehicle.schema.ts";

import type { 
    GetVehicleResponse
} from "@locadora/shared/vehicle/response/get-vehicle.response.js";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import z from "zod";

import RequestService, {
    type APIResponse
} from "@/services/request.service";

import {
    onMounted,
    ref
} from "vue";

import type {
    GetAllCategoryResponse
} from "@locadora/shared/category/response/get-all-category.response.js";

import AppSelect from "@/components/app/AppSelect.vue";

const router = useRouter();

const route = useRoute();

const categories =
    ref<any[]>([]);

const {
    handleSubmit,
    isSubmitting,
    setValues
} = useForm({

    validationSchema:
        toTypedSchema(

            UpdateVehicleRequestSchema.and(

                z.object({

                    file: z
                        .instanceof(File)
                        .optional()

                })

            )

        )

});

const onSubmit =
    handleSubmit(
        async values => {

            const formData =
                new FormData();

            if(values.plate) formData.append("plate", values.plate);

            if(values.brand) formData.append("brand", values.brand);

            if(values.model) formData.append("model", values.model);

            if(values.year) formData.append("year", String(values.year));

            if(values.daily_rate) formData.append("daily_rate", String(values.daily_rate));

            if(values.category_id) formData.append("category_id", String(values.category_id));

            if(values.file) {

                formData.append(
                    "file",
                    values.file
                );

            };

            const result =
                await RequestService.request<
                    APIResponse<any>
                >({

                    method: "PUT",

                    url:
                        `/vehicle/${route.params.id}`,

                    data: formData,

                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }

                });

            if(result?.success)
                router.push(
                    "/vehicles"
                );

        }
    );

onMounted(
    async () => {

        const categoriesResult =
            await RequestService.request<
                GetAllCategoryResponse
            >({

                method: "GET",

                url: "/category"

            });

        if(categoriesResult?.success) {

            categories.value =
                (
                    categoriesResult.data
                    ?? []
                ).map(
                    category => ({
                        label:
                            category.name,
                        value:
                            category.id
                    })
                );

        }

        const vehicleResult =
            await RequestService.request<
                GetVehicleResponse
            >({

                method: "GET",

                url:
                    `/vehicle/${route.params.id}`

            });

        if(vehicleResult?.success) {

            setValues({

                plate:
                    vehicleResult.data!.plate,

                brand:
                    vehicleResult.data!.brand,

                model:
                    vehicleResult.data!.model,

                year:
                    vehicleResult.data!.year,

                daily_rate:
                    vehicleResult.data!.daily_rate,

                status:
                    vehicleResult.data!.status,

                category_id:
                    vehicleResult.data!.category_id

            });

        }

    }
);
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
                Editar veículo
            </CardTitle>

            <CardDescription>
                Atualize as informações do veículo.
            </CardDescription>

        </CardHeader>

        <CardContent>

            <BaseForm
                submit="Salvar"
                :loading="
                    isSubmitting
                "
                @submit="
                    onSubmit
                "
            >

                <VeeField
                    name="plate"
                    v-slot="{ field, errors }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Placa"
                        mask="@@@####"
                    />
                </VeeField>

                <VeeField
                    name="brand"
                    v-slot="{ field, errors }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Marca"
                    />
                </VeeField>

                <VeeField
                    name="model"
                    v-slot="{ field, errors }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Modelo"
                    />
                </VeeField>

                <VeeField
                    name="year"
                    v-slot="{ field, errors }"
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
                    v-slot="{ field, errors }"
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
                        :modelValue="field.value"
                        :field="field"
                        :errors="errors"
                        label="Categoria"
                        :options="categories"
                        @update:model-value="handleChange"
                    />
                </VeeField>

                <VeeField
                    name="file"
                    v-slot="{ field, errors }"
                >
                    <BaseImageInput
                        :field="field"
                        :errors="errors"
                        label="Nova imagem"
                    />
                </VeeField>

            </BaseForm>

        </CardContent>

    </Card>

</template>