<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import RequestService
    from "@/services/request.service";

import type {
    DashboardResponse
} from "@locadora/shared/dashboard/response/dashboard.response.js";

import {
    Car,
    DollarSign,
    LayoutGrid
} from "@lucide/vue";

import {
    onMounted,
    ref
} from "vue";

const dashboard =
    ref<DashboardResponse>({

        availableVehicles: 0,

        highestRateVehicle: undefined,

        vehiclesByCategory: []

    });

const loading =
    ref(true);

onMounted(
    async () => {

        const result =
            await RequestService.request<
                DashboardResponse
            >({

                method: "GET",

                url: "/dashboard"

            });

        if(result?.success)
            dashboard.value =
                result.data!;

        loading.value =
            false;

    }
);
</script>

<template>

    <div class="space-y-6">

        <div>

            <h1
                class="
                    text-3xl
                    font-bold
                "
            >
                Dashboard
            </h1>

            <p
                class="
                    text-muted-foreground
                "
            >
                Visão geral da locadora.
            </p>

        </div>

        <!-- Cards -->

        <div
            class="
                grid
                gap-4
                md:grid-cols-3
            "
        >

            <Card>

                <CardHeader
                    class="
                        flex
                        flex-row
                        items-center
                        justify-between
                    "
                >

                    <CardTitle>
                        Disponíveis
                    </CardTitle>

                    <Car
                        class="
                            h-4
                            w-4
                        "
                    />

                </CardHeader>

                <CardContent>

                    <div
                        class="
                            text-3xl
                            font-bold
                        "
                    >
                        {{
                            dashboard
                                .availableVehicles
                        }}
                    </div>

                </CardContent>

            </Card>

            <Card>

                <CardHeader
                    class="
                        flex
                        flex-row
                        items-center
                        justify-between
                    "
                >

                    <CardTitle>
                        Veículo mais caro
                    </CardTitle>

                    <DollarSign
                        class="
                            h-4
                            w-4
                        "
                    />

                </CardHeader>

                <CardContent>

                    <div
                        class="
                            font-semibold
                        "
                    >
                        {{
                            dashboard
                                .highestRateVehicle
                                ?.brand
                        }}
                        {{
                            dashboard
                                .highestRateVehicle
                                ?.model
                        }}
                    </div>

                    <p
                        class="
                            text-muted-foreground
                        "
                    >
                        R$
                        {{
                            dashboard
                                .highestRateVehicle
                                ?.daily_rate
                        }}/dia
                    </p>

                </CardContent>

            </Card>

            <Card>

                <CardHeader
                    class="
                        flex
                        flex-row
                        items-center
                        justify-between
                    "
                >

                    <CardTitle>
                        Categorias
                    </CardTitle>

                    <LayoutGrid
                        class="
                            h-4
                            w-4
                        "
                    />

                </CardHeader>

                <CardContent>

                    <div
                        class="
                            text-3xl
                            font-bold
                        "
                    >
                        {{
                            dashboard
                                .vehiclesByCategory
                                .length
                        }}
                    </div>

                </CardContent>

            </Card>

        </div>

        <Card>

            <CardHeader>

                <CardTitle>
                    Veículos por categoria
                </CardTitle>

            </CardHeader>

            <CardContent>

                <table
                    class="
                        w-full
                    "
                >

                    <thead>

                        <tr
                            class="
                                border-b
                            "
                        >

                            <th
                                class="
                                    p-4
                                    text-left
                                "
                            >
                                Categoria
                            </th>

                            <th
                                class="
                                    p-4
                                    text-right
                                "
                            >
                                Total
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr
                            v-for="
                                category
                                in dashboard
                                    .vehiclesByCategory
                            "
                            :key="
                                category.name
                            "
                            class="
                                border-b
                            "
                        >

                            <td
                                class="
                                    p-4
                                "
                            >
                                {{
                                    category.name
                                }}
                            </td>

                            <td
                                class="
                                    p-4
                                    text-right
                                    font-semibold
                                "
                            >
                                {{
                                    category.total
                                }}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </CardContent>

        </Card>

    </div>

</template>