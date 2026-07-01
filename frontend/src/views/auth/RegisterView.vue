<script setup lang="ts">
import AuthCard from "@/components/auth/AuthCard.vue";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";
import BaseFormPassword from "@/components/forms/BaseFormPassword.vue";
import { useForm, Field as VeeField } from "vee-validate";
import { api } from "@/api/client";
import { toTypedSchema } from "@vee-validate/zod";
import { RegisterRequestSchema } from "@locadora/shared/auth/request/register.request.js";
import BaseImageInput from "@/components/forms/BaseImageInput.vue";
import z from "zod";
import type { RegisterResponse } from "@locadora/shared/auth/response/register.response.js";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import RequestService from "@/services/request.service";

const auth = useAuthStore();

const router = useRouter();

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        RegisterRequestSchema.and(
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
    ),
});

const onSubmit = handleSubmit(async (values) => {

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("cpf", values.cpf);
    formData.append("password", values.password);
    formData.append("file", values.file);

    const result = await RequestService.request<
        RegisterResponse
    >({
        method: "POST",
        url: "/auth/register",
        data: values,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        toast: true
    });

    if(!result) return;

    if(result.success) {

        const { token, user } = result.data!;

        auth.login(token, user);
    
    };

});
</script>

<template>
    <AuthCard

        title="Locadora"

        description="
            Registre-se na plataforma
        "

    >

        <BaseForm
            submit="Registrar"
            @submit="onSubmit"
        >

            <VeeField
                name="name"
                v-slot="{ field, errors }"
            >
                <BaseFormInput
                    :field="field"
                    :errors="errors"
                    label="Nome"
                    type="name"
                />
            </VeeField>

            <VeeField
                name="email"
                v-slot="{ field, errors }"
            >
                <BaseFormInput
                    :field="field"
                    :errors="errors"
                    label="Email"
                    type="email"
                />
            </VeeField>

            <VeeField
                name="cpf"
                v-slot="{ field, errors }"
            >
                <BaseFormInput
                    :field="field"
                    :errors="errors"
                    label="CPF"
                    type="cpf"
                    mask="###.###.###-##"
                />
            </VeeField>

            <VeeField
                name="password"
                v-slot="{ field, errors }"
            >
                <BaseFormPassword
                    :field="field"
                    :errors="errors"
                    label="Senha"
                />
            </VeeField>

            <VeeField
                name="file"
                v-slot="{ field, errors }"
            >
                <BaseImageInput
                    :field="field"
                    :errors="errors"
                    label="Imagem de perfil"
                />
            </VeeField>

        </BaseForm>

        <div
            class="
                mt-6
                text-center
                text-sm
            "
        >
            Já possui conta?

            <RouterLink
                to="/login"
                class="
                    text-primary
                    hover:underline
                "
            >
                Entrar na conta
            </RouterLink>
        </div>

    </AuthCard>
</template>