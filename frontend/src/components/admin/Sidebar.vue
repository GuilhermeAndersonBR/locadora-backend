<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <aside
        class="
            w-64
            border-r
            bg-background
            p-4
        "
    >
        <h2
            class="
                mb-8
                text-2xl
                font-bold
            "
        >
            Locadora
        </h2>

        <nav class="space-y-2">

            <RouterLink
                to="/admin"
                class="block rounded p-2 hover:bg-muted"
            >
                Dashboard
            </RouterLink>

            <RouterLink
                to="/admin/vehicles"
                class="block rounded p-2 hover:bg-muted"
            >
                Veículos
            </RouterLink>

            <RouterLink
                to="/admin/categories"
                class="block rounded p-2 hover:bg-muted"
            >
                Categorias
            </RouterLink>

            <RouterLink
                to="/admin/rentals"
                class="block rounded p-2 hover:bg-muted"
            >
                Aluguéis
            </RouterLink>

            <RouterLink
                to="/admin/users"
                class="block rounded p-2 hover:bg-muted"
            >
                Usuários
            </RouterLink>

        </nav>
    </aside>
</template>