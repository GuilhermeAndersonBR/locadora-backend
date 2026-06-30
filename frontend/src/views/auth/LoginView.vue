<script setup lang="ts">
import AuthCard from "@/components/auth/AuthCard.vue";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";
import BaseFormPassword from "@/components/forms/BaseFormPassword.vue";
import { useForm, Field as VeeField } from "vee-validate";
import { LoginRequestSchema } from "@locadora/shared/auth/request/login.request.js";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import RequestService from "@/services/request.service";
import type { LoginResponse } from "@locadora/shared/auth/response/login.response.js";

const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
        LoginRequestSchema
    ),
});

const auth = useAuthStore();

const router = useRouter();

const onSubmit = handleSubmit(async (values) => {

    const result = await RequestService.request<
        LoginResponse
    >({
        method: "POST",
        url: "/auth/login",
        data: values
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
            Entre na plataforma
        "

    >

        <BaseForm
            submit="Entrar"
            loading-submit="Entrando..."
            @submit="onSubmit"
            :loading="isSubmitting"
        >

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
                name="password"
                v-slot="{ field, errors }"
            >
                <BaseFormPassword
                    :field="field"
                    :errors="errors"
                    label="Senha"
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
            Não possui conta?

            <RouterLink
                to="/register"
                class="
                    text-primary
                    hover:underline
                "
            >
                Criar conta
            </RouterLink>
        </div>

    </AuthCard>
</template>