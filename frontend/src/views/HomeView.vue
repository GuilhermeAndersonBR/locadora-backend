<script setup lang="ts">
import { onMounted, ref } from "vue";

import VehicleCard from "@/components/VehicleCard.vue";
import { Input } from "@/components/ui/input";

const vehicles = ref([]);

onMounted(async () => {

    // depois substituir pela API
    vehicles.value = [
        {
            id: 1,
            brand: "Toyota",
            model: "Corolla",
            category: "Sedan",
            pricePerDay: 150
        },
        {
            id: 2,
            brand: "Hyundai",
            model: "HB20",
            category: "Hatch",
            pricePerDay: 90
        },
        {
            id: 3,
            brand: "Jeep",
            model: "Compass",
            category: "SUV",
            pricePerDay: 250
        }
    ];

});
</script>

<template>
    <div class="container mx-auto p-6">

        <div class="mb-8">
            <h1 class="text-4xl font-bold">
                Encontre o veículo ideal
            </h1>

            <p class="text-muted-foreground">
                Escolha entre nossos veículos disponíveis.
            </p>
        </div>

        <div class="mb-8">
            <Input
                placeholder="Pesquisar veículo..."
            />
        </div>

        <div
            class="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
            "
        >
            <VehicleCard
                v-for="vehicle in vehicles"
                :key="vehicle.id"
                :vehicle="vehicle"
            />
        </div>

    </div>
</template>