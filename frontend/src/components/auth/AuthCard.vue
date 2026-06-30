<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

defineProps<{

    title: string;

    description: string;

}>();
</script>

<template>
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
                {{ title }}
            </CardTitle>

            <CardDescription
                class="
                    text-center
                "
            >
                {{ description }}
            </CardDescription>

        </CardHeader>

        <CardContent>
            <slot />
        </CardContent>

    </Card>
</template>