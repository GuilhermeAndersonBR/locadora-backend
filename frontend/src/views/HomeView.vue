<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import RequestService from "@/services/request.service";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type {
    AllVehiclesResponse
} from "@locadora/shared/vehicle/response/all-vehicles.response.js";

const router = useRouter();

const vehicles =
    ref<AllVehiclesResponse>([]);

const loading =
    ref(true);

onMounted(async () => {

    const result =
        await RequestService.request<
            AllVehiclesResponse
        >({
            method: "GET",
            url: "/vehicle"
        });

    console.log(result);

    if(result?.success) {

        vehicles.value =
            (result.data ?? [])
                .filter(
                    vehicle =>
                        vehicle.status === "AVAILABLE"
                );

    }

    loading.value = false;

});
</script>

<template>

    <div class="container mx-auto py-8">

        <div class="mb-8">

            <h1
                class="
                    text-4xl
                    font-bold
                "
            >
                Veículos disponíveis
            </h1>

            <p
                class="
                    text-muted-foreground
                    mt-2
                "
            >
                Escolha o veículo ideal para sua próxima viagem.
            </p>

        </div>

        <div
            v-if="loading"
            class="
                text-center
                py-16
            "
        >
            Carregando veículos...
        </div>

        <div
            v-else
            class="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
            "
        >

            <Card
                v-for="
                    vehicle
                    in vehicles
                "
                :key="
                    vehicle.id
                "
            >

                <img
                    :src="
                        vehicle.images?.[0]?.url
                        ?? '/placeholder.png'
                    "
                    class="
                        h-52
                        w-full
                        object-cover
                    "
                />

                <CardHeader>

                    <CardTitle>

                        {{
                            vehicle.brand
                        }}

                        {{
                            vehicle.model
                        }}

                    </CardTitle>

                    <CardDescription>
                        {{ vehicle.plate }}
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <div
                        class="
                            flex
                            justify-between
                            text-sm
                        "
                    >

                        <span>
                            Ano:
                            {{ vehicle.year }}
                        </span>

                        <span
                            class="
                                font-semibold
                            "
                        >
                            R$
                            {{
                                Number(
                                    vehicle.daily_rate
                                ).toFixed(2)
                            }}/dia
                        </span>

                    </div>

                </CardContent>

                <CardFooter>

                    <Button
                        class="w-full"
                        @click="
                            router.push(
                                `/rentals/create/${vehicle.id}`
                            )
                        "
                    >
                        Alugar
                    </Button>

                </CardFooter>

            </Card>

        </div>

    </div>

</template>