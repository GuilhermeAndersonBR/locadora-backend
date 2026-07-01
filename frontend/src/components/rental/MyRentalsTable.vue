<script setup lang="ts">
import { ref, onMounted } from "vue";

import RequestService
    from "@/services/request.service";

import {
    Card,
    CardContent
} from "@/components/ui/card";

import RentalStatusBadge
    from "./RentalStatusBadge.vue";

import RentalActions
    from "./RentalActions.vue";

import type {
    GetAllRentalResponse
} from "@locadora/shared/rental/response/get-all-rental.response.js";

import type {
    CreatePaymentRequest
} from "@locadora/shared/payment/request/create-payment.request.js";

import { useAuthStore }
    from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();

const router = useRouter();

const rentals =
    ref<GetAllRentalResponse>(
        []
    );

onMounted(async () => {

    const result =
        await RequestService.request<
            GetAllRentalResponse
        >({

            method: "GET",

            url:
                `/rental/${auth.user?.id}`

        });

    if(result?.success)
        rentals.value =
            result.data ?? [];

});

async function payRental(
    id: number
) {

    const result =
        await RequestService.request<
            CreatePaymentRequest
        >({

            method: "PATCH",

            url:
                `/payment/pay`,
            
            data: {
                rental_id: id,
                payment_method: "CREDIT_CARD"
            },

        });

    if(result?.success) {

        rentals.value =
            rentals.value.map(
                rental =>

                    rental.id === id
                        ? {
                            ...rental,
                            payment: {
                                ...rental,
                                status: "PAID"
                            }
                        }
                        : rental
            );

    }

}

async function finishRental(
    id: number
) {

    const result =
        await RequestService.request({

            method: "PATCH",

            url:
                `/rental/${id}/finish`

        });

    if(result?.success)
        router.go(0);

}

async function cancelRental(
    id: number
) {

    const result =
        await RequestService.request({

            method: "PATCH",

            url:
                `/rental/${id}/cancel`

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
                            Veículo
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Placa
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Retirada
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Devolução
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Total
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
                            rental
                            in rentals
                        "
                        :key="
                            rental.id
                        "
                        class="
                            border-b
                        "
                    >

                        <td class="p-4">

                            {{
                                rental
                                    .vehicle
                                    .brand
                            }}

                            {{

                                rental
                                    .vehicle
                                    .model

                            }}

                        </td>

                        <td class="p-4">

                            {{
                                rental
                                    .vehicle
                                    .plate
                            }}

                        </td>

                        <td class="p-4">

                            {{
                                new Date(
                                    rental
                                        .start_date
                                )
                                .toLocaleDateString(
                                    "pt-BR"
                                )
                            }}

                        </td>

                        <td class="p-4">

                            {{
                                rental.return_date
                                    ? 
                                    new Date(
                                        rental
                                            .return_date
                                    )
                                    .toLocaleDateString(
                                        "pt-BR"
                                    )
                                    :
                                new Date(
                                    rental
                                        .expected_return_date
                                )
                                .toLocaleDateString(
                                    "pt-BR"
                                )
                            }}

                        </td>

                        <td class="p-4">

                            R$
                            {{

                                (
                                    rental
                                        .total_price_cents
                                )
                                .toFixed(2)

                            }}

                        </td>

                        <td class="p-4">

                            <RentalStatusBadge
                                :status="
                                    rental
                                        .status
                                "
                            />

                        </td>

                        <td
                            class="
                                flex
                                justify-end
                                p-4
                            "
                        >

                            <RentalActions
                                :rental-id="
                                    rental.id
                                "
                                :status="
                                    rental.status
                                "
                                @pay="payRental"
                                @finish="finishRental"
                                @cancel="
                                    cancelRental
                                "
                            />

                        </td>

                    </tr>

                    <tr
                        v-if="
                            !rentals.length
                        "
                    >

                        <td
                            colspan="7"
                            class="
                                p-8
                                text-center
                                text-muted-foreground
                            "
                        >

                            Você ainda
                            não possui
                            aluguéis.

                        </td>

                    </tr>

                </tbody>

            </table>

        </CardContent>

    </Card>

</template>