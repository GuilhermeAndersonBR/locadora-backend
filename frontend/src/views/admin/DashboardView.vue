<script setup lang="ts">
import Sidebar from "@/components/admin/Sidebar.vue";
import DashboardCard from "@/components/admin/DashboardCard.vue";

const stats = {
    vehicles: 42,
    activeRentals: 12,
    users: 128,
    revenue: "R$ 8.540"
};
</script>

<template>
    <div class="flex min-h-screen">

        <Sidebar />

        <main class="flex-1 p-8">

            <h1
                class="
                    mb-8
                    text-4xl
                    font-bold
                "
            >
                Dashboard
            </h1>

            <div
                class="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >
                <DashboardCard
                    title="Veículos"
                    :value="stats.vehicles"
                />

                <DashboardCard
                    title="Aluguéis ativos"
                    :value="stats.activeRentals"
                />

                <DashboardCard
                    title="Clientes"
                    :value="stats.users"
                />

                <DashboardCard
                    title="Receita"
                    :value="stats.revenue"
                />
            </div>

        </main>

    </div>
</template>