<script setup lang="ts">
import { useRouter } from "vue-router";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field as VeeField } from "vee-validate";

import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { api } from "@/api/client";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue-sonner";

const schema =
    toTypedSchema(
        z.object({
            email: z
                .string()
                .email("Email inválido"),

            password: z
                .string()
                .min(
                    8,
                    "A senha deve possuir pelo menos 8 caracteres"
                )
        })
    );

const {
    handleSubmit
} = useForm({

    validationSchema: schema,

    initialValues: {

        email: "",
        password: ""

    }

});

const router = useRouter();

const auth = useAuthStore();

const onSubmit =
    handleSubmit(
        async (data) => {

            try {

                const response = await api.post(
                    "/auth/login",
                    data
                );

                console.log(response.data.data.token);

                auth.token = response.data.data.token;

                localStorage.setItem(
                    "token",
                    response.data.data.token
                );

                router.push({
                    name: "dashboard"
                });

            } catch(error) {

                console.log(error)

                toast.error(
                    "Email ou senha inválidos"
                )
                
            }

        }
    );
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
                max-w-md
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
                    Entre na plataforma
                </CardDescription>

            </CardHeader>

            <CardContent>

                <form
                    id="login"
                    class="space-y-6"
                    @submit="onSubmit"
                >

                    <FieldGroup>

                        <VeeField
                            v-slot="{ field, errors }"
                            name="email"
                        >

                            <Field
                                :data-invalid="
                                    !!errors.length
                                "
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

                        <VeeField
                            v-slot="{ field, errors }"
                            name="password"
                        >

                            <Field
                                :data-invalid="
                                    !!errors.length
                                "
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

                        <Button
                            class="w-full"
                            type="submit"
                            form="login"
                        >
                            Entrar
                        </Button>

                    </FieldGroup>

                </form>

            </CardContent>

            <p
                class="
                    text-muted-foreground
                    text-center
                    text-sm
                "
            >
                Não possui uma conta?

                <RouterLink
                    to="/register"
                    class="
                        text-primary
                        ml-1
                        font-medium
                        hover:underline
                    "
                >
                    Criar conta
                </RouterLink>
            </p>

        </Card>

    </div>
</template>