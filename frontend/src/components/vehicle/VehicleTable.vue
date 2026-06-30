<script setup lang="ts">
import RequestService, { type APIResponse } from "@/services/request.service.ts";
import VehicleStatusBadge
    from "./VehicleStatusBadge.vue";

import {
    Card,
    CardContent
} from "@/components/ui/card";

import type { AllVehiclesResponse } from "@locadora/shared/vehicle/response/all-vehicles.response.js";

import { onMounted, ref } from "vue";
import VehicleActions from "./VehicleActions.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.ts";

const router = useRouter();

const auth = useAuthStore();

const vehicles = ref<AllVehiclesResponse>([]);

onMounted(async () => {
    
    const result = await RequestService.request<
        AllVehiclesResponse
    >({
        method: "GET",
        url: "/vehicle"
    });

    if(result?.success) 
        vehicles.value = result.data ?? [];

});

async function deleteVehicle(
    id: number
) {

    const result = await RequestService.request<
        APIResponse<any>
    >({
        method: "DELETE",
        url: `/vehicle/${id}`
    });

    if(result?.success) 
        router.go(0);
};
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
                            Placa
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Marca
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Modelo
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Ano
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Diária
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
                            vehicle
                            in vehicles
                        "
                        :key="
                            vehicle.id
                        "
                        class="
                            border-b
                        "
                    >

                        <td class="p-4">
                            {{ vehicle.plate }}
                        </td>

                        <td class="p-4">
                            {{ vehicle.brand }}
                        </td>

                        <td class="p-4">
                            {{ vehicle.model }}
                        </td>

                        <td class="p-4">
                            {{ vehicle.year }}
                        </td>

                        <td class="p-4">
                            R$
                            {{
                                vehicle.daily_rate
                            }}
                        </td>

                        <td class="p-4">
                            <VehicleStatusBadge
                                :status="
                                    vehicle.status
                                "
                            />
                        </td>

                        <td
                            class="
                                flex
                                p-4
                                justify-end
                            "
                        >
                            <VehicleActions
                                :vehicle-id="vehicle.id" 
                                @edit="id => router.push(`/vehicle/${id}/edit`)"
                                @delete="deleteVehicle"
                            />
                        </td>

                    </tr>

                </tbody>

            </table>

        </CardContent>

    </Card>
</template>