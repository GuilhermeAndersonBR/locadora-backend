<script setup lang="ts">
import {
    Badge
} from "@/components/ui/badge";

type RentalStatus =
    | "ACTIVE"
    | "FINISHED"
    | "CANCELLED"
    | "LATE";

const props =
    defineProps<{
        status: RentalStatus;
    }>();

const variants = {

    ACTIVE: {
        label: "Ativa",
        class:
            "bg-blue-500/15 text-blue-600 border-blue-500/20"
    },

    FINISHED: {
        label: "Finalizada",
        class:
            "bg-green-500/15 text-green-600 border-green-500/20"
    },

    CANCELLED: {
        label: "Cancelada",
        class:
            "bg-red-500/15 text-red-600 border-red-500/20"
    },

    LATE: {
        label: "Atrasada",
        class:
            "bg-yellow-500/15 text-yellow-600 border-yellow-500/20"
    }

} as const;

const current =
    variants[
        props.status
    ] ?? {

        label:
            props.status,

        class:
            ""

    };
</script>

<template>

    <Badge
        variant="outline"
        :class="
            current.class
        "
    >

        {{
            current.label
        }}

    </Badge>

</template>