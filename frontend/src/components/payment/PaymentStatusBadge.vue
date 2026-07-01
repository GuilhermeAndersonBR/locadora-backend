<script setup lang="ts">
import {
    Badge
} from "@/components/ui/badge";
import type PaymentStatus from "@locadora/shared/payment/types/payment-status.type.js";

const props =
    defineProps<{
        status: PaymentStatus;
    }>();

const variants = {

    PENDING: {
        label: "Pendente",
        class:
            "bg-yellow-500/15 text-yellow-600 border-yellow-500/20"
    },

    PAID: {
        label: "Pago",
        class:
            "bg-green-500/15 text-green-600 border-green-500/20"
    },

    "FAILED": {
        label: "Cancelado",
        class:
            "bg-red-500/15 text-red-600 border-red-500/20"
    },

    REFUNDED: {
        label: "Estornado",
        class:
            "bg-blue-500/15 text-blue-600 border-blue-500/20"
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