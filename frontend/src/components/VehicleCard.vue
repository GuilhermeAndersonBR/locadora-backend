<script setup lang="ts">
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

defineProps<{
    vehicle: {
        id: number;
        brand: string;
        model: string;
        category: string;
        pricePerDay: number;
        image?: string;
    };
}>();
</script>

<template>
    <Card>
        <CardHeader>
            <img
                :src="vehicle.image || '/car-placeholder.jpg'"
                class="h-48 w-full rounded-md object-cover"
            />

            <CardTitle>
                {{ vehicle.brand }}
                {{ vehicle.model }}
            </CardTitle>
        </CardHeader>

        <CardContent>
            <div class="flex justify-between">
                <span>{{ vehicle.category }}</span>

                <span class="font-bold">
                    R$ {{ vehicle.pricePerDay }}/dia
                </span>
            </div>
        </CardContent>

        <CardFooter>
            <Button class="w-full">
                Alugar
            </Button>
        </CardFooter>
    </Card>
</template>