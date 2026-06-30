<script setup lang="ts">
import {
    Car,
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    SquarePen
} from "@lucide/vue";
</script>

<template>
    <aside
        class="
            flex
            w-64
            flex-col
            border-r
            bg-background
        "
    >

        <div
            class="
                border-b
                p-6
            "
        >
            <h1
                class="
                    text-xl
                    font-bold
                "
            >
                Locadora
            </h1>
        </div>

        <nav
            class="
                flex
                flex-1
                flex-col
                gap-1
                p-4
            "
        >

            <RouterLink
                to="/dashboard"
                class="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    hover:bg-muted
                "
            >
                <LayoutDashboard :size="18" />
                Dashboard
            </RouterLink>

            <RouterLink
                to="/vehicles"
                class="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    hover:bg-muted
                "
            >
                <Car :size="18" />
                Veículos
            </RouterLink>

            <RouterLink
                to="/categories"
                class="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    hover:bg-muted
                "
            >
                <SquarePen :size="18" />
                Categorias
            </RouterLink>

            <RouterLink
                to="/rentals"
                class="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    hover:bg-muted
                "
            >
                <Calendar :size="18" />
                Locações
            </RouterLink>

            <RouterLink
                to="/users"
                class="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    hover:bg-muted
                "
            >
                <Users :size="18" />
                Usuários
            </RouterLink>

        </nav>

        <div
            class="
                border-t
                p-4
            "
        >
            <RouterLink
                to="/settings"
                class="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    hover:bg-muted
                "
            >
                <Settings :size="18" />
                Configurações
            </RouterLink>
        </div>

    </aside>
</template>