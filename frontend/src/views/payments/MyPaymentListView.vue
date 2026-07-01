<script setup lang="ts">
import PaymentTable from "@/components/payment/PaymentTable.vue";
</script>

<template>

    <div class="space-y-6">

        <div
            class="
                flex
                items-center
                justify-between
            "
        >

            <div>

                <h1
                    class="
                        text-3xl
                        font-bold
                    "
                >
                    Meus pagamentos
                </h1>

                <p
                    class="
                        text-muted-foreground
                    "
                >
                    Visualize o histórico dos seus pagamentos.
                </p>

            </div>

        </div>

        <PaymentTable
            :show-actions="false"
        />

    </div>

</template>