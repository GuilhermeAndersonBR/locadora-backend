<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useForm, Field as VeeField } from "vee-validate";

import BaseForm from "@/components/forms/BaseForm.vue";
import BaseFormInput from "@/components/forms/BaseFormInput.vue";
import AppSelect from "@/components/app/AppSelect.vue";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import RequestService, {
    type APIResponse
} from "@/services/request.service";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const auth = useAuthStore();

const vehicles = ref<any[]>([]);
const selectedVehicle = ref<any>();

const {
    handleSubmit,
    isSubmitting,
    setFieldValue,
    values
} = useForm({

    initialValues: {

        vehicle_id: undefined,

        start_date: "",

        expected_return_date: ""

    }

});

const total = computed(() => {

    if(
        !selectedVehicle.value ||
        !values.start_date ||
        !values.expected_return_date
    )
        return 0;

    const start =
        new Date(
            values.start_date
        );

    const end =
        new Date(
            values.expected_return_date
        );

    const days =
        Math.max(
            1,
            Math.ceil(
                (
                    end.getTime() -
                    start.getTime()
                ) / 86400000
            )
        );

    return (
        days *
        selectedVehicle.value.daily_rate
    );

});

function selectVehicle(
    id: number
) {

    selectedVehicle.value =
        vehicles.value.find(
            vehicle =>
                vehicle.id === id
        );

    setFieldValue(
        "vehicle_id",
        id
    );

}

const onSubmit =
    handleSubmit(
        async values => {

            const result =
                await RequestService.request<
                    APIResponse<any>
                >({

                    method: "POST",

                    url: "/rental",

                    data: {

                        user_id: auth.user?.id,

                        vehicle_id:
                            values.vehicle_id,

                        start_date:
                            values.start_date,

                        expected_return_date:
                            values.expected_return_date

                    },

                    toast: true

                });

            if(result?.success)
                router.push(
                    "/"
                );

        }
    );

onMounted(async () => {

    const result =
        await RequestService.request({

            method: "GET",

            url: "/vehicle"

        });

    if(result?.success)
        vehicles.value =
            (
                result.data ?? []
            ).filter(
                (vehicle: any) =>
                    vehicle.status ===
                    "AVAILABLE"
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
                Alugar veículo
            </CardTitle>

            <CardDescription>
                Escolha um veículo disponível para locação.
            </CardDescription>

        </CardHeader>

        <CardContent>

            <BaseForm
                submit="Confirmar aluguel"
                :loading="
                    isSubmitting
                "
                @submit="
                    onSubmit
                "
            >

                <VeeField
                    name="vehicle_id"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <AppSelect
                        numeric
                        label="Veículo"
                        :field="field"
                        :errors="errors"
                        :options="
                            vehicles.map(
                                vehicle => ({
                                    value:
                                        vehicle.id,

                                    label:
                                        `${vehicle.brand}
                                         ${vehicle.model}
                                         - R$ ${
                                            vehicle.daily_rate
                                         }/dia`
                                })
                            )
                        "
                        @update:model-value="
                            selectVehicle
                        "
                    />
                </VeeField>

                <VeeField
                    name="start_date"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        type="date"
                        label="Data de retirada"
                        :field="field"
                        :errors="errors"
                    />
                </VeeField>

                <VeeField
                    name="expected_return_date"
                    v-slot="{
                        field,
                        errors
                    }"
                >
                    <BaseFormInput
                        type="date"
                        label="Data prevista de devolução"
                        :field="field"
                        :errors="errors"
                    />
                </VeeField>

                <Card
                    v-if="
                        selectedVehicle
                    "
                >

                    <CardContent
                        class="
                            pt-6
                            space-y-4
                        "
                    >

                        <div
                            class="
                                flex
                                justify-between
                            "
                        >
                            <span>
                                Veículo
                            </span>

                            <span>
                                {{
                                    selectedVehicle.brand
                                }}
                                {{
                                    selectedVehicle.model
                                }}
                            </span>
                        </div>

                        <div
                            class="
                                flex
                                justify-between
                            "
                        >
                            <span>
                                Diária
                            </span>

                            <span>
                                R$
                                {{
                                    selectedVehicle.daily_rate
                                }}
                            </span>
                        </div>

                        <div
                            class="
                                flex
                                justify-between
                                text-lg
                                font-bold
                            "
                        >
                            <span>
                                Total
                            </span>

                            <span>
                                R$
                                {{
                                    total
                                }}
                            </span>
                        </div>

                    </CardContent>

                </Card>

            </BaseForm>

        </CardContent>

    </Card>

</template>