<script setup lang="ts">
import { onMounted } from "vue";

import { useRouter, useRoute } from "vue-router";

import { useForm, Field as VeeField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import RequestService, {
    type APIResponse
} from "@/services/request.service";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import {
    UpdateCategoryRequestSchema
} from "@locadora/shared/category/request/update-category.request.js";

import type {
    GetCategoryResponse
} from "@locadora/shared/category/response/get-category.response.js";

const router = useRouter();

const route = useRoute();

const {
    handleSubmit,
    isSubmitting,
    setValues
} = useForm({

    validationSchema:
        toTypedSchema(
            UpdateCategoryRequestSchema
        )

});

const onSubmit =
    handleSubmit(
        async values => {

            const result =
                await RequestService.request<
                    APIResponse<any>
                >({

                    method: "PUT",

                    url:
                        `/category/${route.params.id}`,

                    data: values,

                    toast: true

                });

            if(result?.success)
                router.push(
                    "/categories"
                );

        }
    );

onMounted(
    async () => {

        const result =
            await RequestService.request<
                GetCategoryResponse
            >({

                method: "GET",

                url:
                    `/category/${route.params.id}`

            });

        if(result?.success) {

            setValues({

                name: result.data?.name,

                description:
                    result.data?.description

            });

        }

    }
);
</script>

<template>

    <Card
        class="
            mx-auto
            max-w-2xl
        "
    >

        <CardHeader>

            <CardTitle>
                Editar categoria
            </CardTitle>

            <CardDescription>
                Atualize as informações da categoria.
            </CardDescription>

        </CardHeader>

        <CardContent>

            <BaseForm
                submit="Salvar"
                :loading="isSubmitting"
                @submit="onSubmit"
            >

                <VeeField
                    name="name"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Nome"
                    />
                </VeeField>

                <VeeField
                    name="description"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        :field="field"
                        :errors="errors"
                        label="Descrição"
                    />
                </VeeField>

            </BaseForm>

        </CardContent>

    </Card>

</template>