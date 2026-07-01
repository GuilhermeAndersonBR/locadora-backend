<script setup lang="ts">
import RequestService, {
    type APIResponse
} from "@/services/request.service";

import type {
    GetAllPaymentResponse
} from "@locadora/shared/payment/response/get-all-payment.response.js";

import PaymentMethodBadge 
    from "./PaymentMethodBadge.vue";

import {
    Card,
    CardContent
} from "@/components/ui/card";

import PaymentActions
    from "./PaymentActions.vue";

import PaymentStatusBadge
    from "./PaymentStatusBadge.vue";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router =
    useRouter();

const payments =
    ref<GetAllPaymentResponse>([]);

const props = withDefaults(
    defineProps<{
        showActions?: boolean;
    }>(),
    {
        showActions: true
    }
);

onMounted(async () => {

    const result =
        await RequestService.request<
            GetAllPaymentResponse
        >({

            method: "GET",

            url: "/payment",

        });

    if(result?.success)
        payments.value =
            result.data ?? [];

});

async function deletePayment(
    id: number
) {

    const result =
        await RequestService.request<
            APIResponse<any>
        >({

            method: "DELETE",

            url:
                `/payment/${id}`

        });

    if(result?.success)
        router.go(0);

}
</script>

<template>

    <Card>

        <CardContent class="p-0">

            <table class="w-full">

                <thead
                    class="
                        border-b
                        bg-muted/50
                    "
                >

                    <tr>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Locação
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Cliente
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Veículo
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Método
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Valor
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Status
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Data
                        </th>

                        <th
                            v-if="showActions"
                            class="
                                p-4
                                text-right
                            "
                        >
                            Ações
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr
                        v-for="
                            payment
                            in payments
                        "
                        :key="
                            payment.id
                        "
                        class="
                            border-b
                        "
                    >

                        <td class="p-4">
                            #{{ payment.rental_id }}
                        </td>

                        <td class="p-4">
                            {{
                                payment.user
                                    ?.name
                            }}
                        </td>

                        <td class="p-4">
                            {{
                                payment.vehicle
                                    ?.brand
                            }}
                            {{
                                payment.vehicle
                                    ?.model
                            }}
                        </td>

                        <td class="p-4">
                            <PaymentMethodBadge
                                :method="
                                    payment.payment_method
                                "
                            />
                        </td>

                        <td class="p-4">

                            R$
                            {{
                                Number(
                                    payment.amount
                                ).toFixed(2)
                            }}

                        </td>

                        <td class="p-4">

                            <PaymentStatusBadge
                                :status="
                                    payment.status
                                "
                            />

                        </td>

                        <td class="p-4">

                            {{
                                new Date(
                                    payment.created_at
                                )
                                .toLocaleDateString(
                                    "pt-BR"
                                )
                            }}

                        </td>

                        <td
                            v-if="showActions"
                            class="
                                flex
                                justify-end
                                p-4
                            "
                        >

                            <PaymentActions
                                :payment-id="
                                    payment.id
                                "
                                @edit="
                                    id =>
                                        router.push(
                                            `/payment/${id}/edit`
                                        )
                                "
                                @delete="
                                    deletePayment
                                "
                            />

                        </td>

                    </tr>

                    <tr
                        v-if="
                            !payments.length
                        "
                    >

                        <td
                            colspan="8"
                            class="
                                p-8
                                text-center
                                text-muted-foreground
                            "
                        >

                            Nenhum pagamento
                            encontrado.

                        </td>

                    </tr>

                </tbody>

            </table>

        </CardContent>

    </Card>

</template>