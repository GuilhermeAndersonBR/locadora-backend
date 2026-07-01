<script setup lang="ts">
import {
    Badge
} from "@/components/ui/badge";

import type PaymentMethod
    from "@locadora/shared/payment/types/payment-method.type.js";

const props =
    defineProps<{
        method: PaymentMethod;
    }>();

const variants = {

    CASH: {
        label: "Dinheiro",
        class:
            "bg-green-500/15 text-green-600 border-green-500/20"
    },

    PIX: {
        label: "PIX",
        class:
            "bg-emerald-500/15 text-emerald-600 border-emerald-500/20"
    },

    CREDIT_CARD: {
        label: "Crédito",
        class:
            "bg-blue-500/15 text-blue-600 border-blue-500/20"
    },

    DEBIT_CARD: {
        label: "Débito",
        class:
            "bg-purple-500/15 text-purple-600 border-purple-500/20"
    }

} as const;

const current =
    variants[
        props.method
    ] ?? {

        label:
            props.method,

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