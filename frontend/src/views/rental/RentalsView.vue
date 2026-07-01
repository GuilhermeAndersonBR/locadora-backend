<script setup lang="ts">
import MyRentalsTable
    from "@/components/rental/MyRentalsTable.vue";
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
                Meus Aluguéis
            </h1>

            <p
                class="
                    text-muted-foreground
                "
            >
                Visualize todos os seus veículos alugados.
            </p>

        </div>

        <MyRentalsTable />

    </div>

</template>