<script setup lang="ts">
import { useRouter } from "vue-router";

import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { vMaska } from "maska/vue";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from '@/components/ui/field'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ref } from 'vue'
import { api } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const file = ref<File | null>(null)

const schema = toTypedSchema(
    z.object({
        name: z.string().min(2, 'Nome obrigatório'),
        email: z.string().email('Email inválido'),
        cpf: z
            .string()
            .min(11, 'CPF inválido')
            .max(14, 'CPF inválido'),
        password: z.string().min(8, 'Senha mínima de 8 caracteres'),
    })
)

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        email: '',
        cpf: '',
        password: '',
    },
})

function onFileChange(e: Event) {
    const target = e.target as HTMLInputElement

    if (!target.files?.length)
        return

    file.value = target.files[0]
}

const auth = useAuthStore();

const router = useRouter();

const onSubmit = handleSubmit(async (values) => {

    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('cpf', values.cpf)
    formData.append('password', values.password)

    if (file.value) {
        formData.append('file', file.value)
    }

    try {

        const response = await api.post(
            'auth/register',
            formData,
        )

        auth.token = response.data.data.token;

        auth.user = response.data.data.user;

        localStorage.setItem(
            "token",
            response.data.data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.data.user)
        );

        router.push({
            name: "/"
        });

    } catch (err) {

        console.error(err)

    }

})
</script>

<template>
    <div
        class="
            flex
            min-h-screen
            items-center
            justify-center
            bg-muted/60
            p-4
        "
    >

        <Card
            class="
                w-full
                max-w-lg
            "
        >

            <CardHeader>

                <CardTitle
                    class="
                        text-center
                        text-2xl
                    "
                >
                    Locadora
                </CardTitle>

                <CardDescription
                    class="text-center"
                >
                    Cadastre-se para entrar na plataforma
                </CardDescription>

            </CardHeader>

            <CardContent>

                <form
                    id="register"
                    class="space-y-6"
                    @submit="onSubmit"
                >

                    <FieldGroup>

                        <VeeField
                            v-slot="{ errors }"
                            name="file"
                        >

                            <Field
                                :data-invalid="!!errors.length"
                            >

                                <FieldLabel>
                                    Foto de perfil
                                </FieldLabel>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    @change="onFileChange"
                                />

                                <FieldError
                                    v-if="errors.length"
                                    :errors="errors"
                                />

                            </Field>

                        </VeeField>

                        <!-- Nome -->
                        <VeeField
                            v-slot="{ field, errors }"
                            name="name"
                        >

                            <Field
                                :data-invalid="!!errors.length"
                            >

                                <FieldLabel>
                                    Nome
                                </FieldLabel>

                                <Input
                                    v-bind="field"
                                    placeholder="Digite seu nome"
                                />

                                <FieldError
                                    v-if="errors.length"
                                    :errors="errors"
                                />

                            </Field>

                        </VeeField>

                        <!-- Email -->
                        <VeeField
                            v-slot="{ field, errors }"
                            name="email"
                        >

                            <Field
                                :data-invalid="!!errors.length"
                            >

                                <FieldLabel>
                                    Email
                                </FieldLabel>

                                <Input
                                    v-bind="field"
                                    type="email"
                                    placeholder="Digite seu email"
                                />

                                <FieldError
                                    v-if="errors.length"
                                    :errors="errors"
                                />

                            </Field>

                        </VeeField>

                        <!-- CPF -->
                        <VeeField
                            v-slot="{ field, errors }"
                            name="cpf"
                        >

                            <Field
                                :data-invalid="!!errors.length"
                            >

                                <FieldLabel>
                                    CPF
                                </FieldLabel>

                                <Input
                                    v-bind="field"
                                    v-maska="'###.###.###-##'"
                                    placeholder="000.000.000-00"
                                />

                                <FieldError
                                    v-if="errors.length"
                                    :errors="errors"
                                />

                            </Field>

                        </VeeField>

                        <!-- Senha -->
                        <VeeField
                            v-slot="{ field, errors }"
                            name="password"
                        >

                            <Field
                                :data-invalid="!!errors.length"
                            >

                                <FieldLabel>
                                    Senha
                                </FieldLabel>

                                <Input
                                    v-bind="field"
                                    type="password"
                                    placeholder="Digite sua senha"
                                />

                                <FieldError
                                    v-if="errors.length"
                                    :errors="errors"
                                />

                            </Field>

                        </VeeField>

                    </FieldGroup>

                </form>

            </CardContent>

            <CardFooter
                class="
                    flex
                    flex-col
                    gap-4
                "
            >

                <Button
                    class="w-full"
                    type="submit"
                    form="register"
                >
                    Criar conta
                </Button>

                <p
                    class="
                        text-muted-foreground
                        text-center
                        text-sm
                    "
                >
                    Já possui uma conta?

                    <RouterLink
                        to="/login"
                        class="
                            text-primary
                            ml-1
                            font-medium
                            hover:underline
                        "
                    >
                        Entrar
                    </RouterLink>
                </p>

            </CardFooter>

        </Card>

    </div>
</template>