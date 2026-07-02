<script setup lang="ts">
import { useRouter } from "vue-router";
import { useForm, Field as VeeField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";

import RequestService from "@/services/request.service";

import {
    CreateCategoryRequestSchema
} from "@locadora/shared/category/request/create-category.request.js";

const router = useRouter();

const {
    handleSubmit,
    isSubmitting
} = useForm({

    validationSchema:
        toTypedSchema(
            CreateCategoryRequestSchema
        )

});

const onSubmit =
    handleSubmit(
        async values => {

            const result =
                await RequestService.request({

                    method: "POST",

                    url: "/category",

                    data: values,

                    toast: true

                });

            if(result?.success)
                router.push(
                    "/categories"
                );

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
        Nova categoria
      </CardTitle>

      <CardDescription>
        Cadastre uma categoria.
      </CardDescription>
    </CardHeader>

    <CardContent>
      <BaseForm
        submit="Cadastrar"
        :loading="isSubmitting"
        @submit="onSubmit"
      >
        <VeeField
          v-slot="{ field, errors }"
          name="name"
        >
          <BaseFormInput
            label="Nome"
            :field="field"
            :errors="errors"
          />
        </VeeField>

        <VeeField
          v-slot="{ field, errors }"
          name="description"
        >
          <BaseFormInput
            label="Descrição"
            :field="field"
            :errors="errors"
          />
        </VeeField>
      </BaseForm>
    </CardContent>
  </Card>
</template>