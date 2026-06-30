<script setup lang="ts">
import { useRouter } from "vue-router";

import { useForm, Field as VeeField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";
import BaseImageInput from "@/components/forms/BaseImageInput.vue";

import { CreateVehicleRequestSchema } from "@locadora/shared/vehicle/request/create-vehicle.schema.ts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import z from "zod";
import RequestService, { type APIResponse } from "@/services/request.service";
import { onMounted, ref } from "vue";
import type { CreateCategoryResponse } from "@locadora/shared/category/response/get-category.response.js";

import AppSelect from "@/components/app/AppSelect.vue";

const router = useRouter();

const {
    handleSubmit,
    isSubmitting
} = useForm({

    validationSchema: toTypedSchema(
        CreateVehicleRequestSchema.and(
            z.object({
                file: z
                    .instanceof(File, {
                        message: "IMAGE_REQUIRED"
                    })
                    .refine(
                        file => file.size <= 5 * 1024 * 1024,
                        "IMAGE_TOO_LARGE"
                    )
            })
        )
    )

});

const onSubmit = handleSubmit(
    async values => {

        const formData =
            new FormData();

        formData.append("plate", values.plate);

        formData.append("brand", values.brand);

        formData.append("model", values.model);

        formData.append("year", String(values.year));

        formData.append("daily_rate", String(values.daily_rate));

        formData.append("category_id", String(values.category_id));

        formData.append("file", values.file);

        const result = await RequestService.request<
            APIResponse<any>
        >({
            method: "POST",
            url: "/vehicle",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if(result?.success) router.push("/vehicles");

    }
);

const categories = ref<
    Array<any>
>([]);

onMounted(async () => {
    
    const result = await RequestService.request<
        CreateCategoryResponse
    >({
        method: "GET",
        url: "/category"
    });

    if(result?.success) 
        categories.value = result.data ?? [];

    categories.value = categories.value.map(
        category => ({
            label: category.name,
            value: category.id
        })
    );

})
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
                Novo veículo
            </CardTitle>

            <CardDescription>
                Cadastre um novo veículo.
            </CardDescription>

        </CardHeader>

        <CardContent>

            <BaseForm
                submit="Cadastrar"
                :loading="
                    isSubmitting
                "
                @submit="
                    onSubmit
                "
            >

                <VeeField
                    name="plate"
                    v-slot="
                        {
                            field,
                            errors
                        }
                    "
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
                    v-slot="
                        {
                            field,
                            errors
                        }
                    "
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Marca"
                    />
                </VeeField>

                <VeeField
                    name="model"
                    v-slot="
                        {
                            field,
                            errors
                        }
                    "
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Modelo"
                    />
                </VeeField>

                <VeeField
                    name="year"
                    v-slot="
                        {
                            field,
                            errors
                        }
                    "
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
                    v-slot="
                        {
                            field,
                            errors
                        }
                    "
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
                    v-slot="
                        {
                            field,
                            handleChange,
                            errors
                        }
                    "
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
                    v-slot="
                        {
                            field,
                            errors
                        }
                    "
                >
                    <BaseImageInput
                        :field="field"
                        :errors="errors"
                        label="Imagens"
                        multiple
                    />
                </VeeField>

            </BaseForm>

        </CardContent>

    </Card>

</template>