<script setup lang="ts">
import {
    Car,
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    SquarePen,
    PanelLeft,
    Banknote
} from "@lucide/vue";

import {
    useSidebarStore
} from "@/stores/sidebar";

const sidebar =
    useSidebarStore();
</script>

<template>
  <aside
    class="
            fixed
            left-0
            top-0
            z-50
            flex
            h-screen
            flex-col
            border-r
            bg-background
            transition-all
            duration-300
            shadow-md
        "
    :class="
      sidebar.collapsed
        ? 'w-20'
        : 'w-64'
    "
  >
    <!-- Header -->

    <div
      class="
                flex
                items-center
                justify-between
                border-b
                p-4
            "
    >
      <h1
        v-if="
          !sidebar.collapsed
        "
        class="
                    text-xl
                    font-bold
                "
      >
        Locadora
      </h1>

      <button
        class="
                    rounded-md
                    p-2
                    hover:bg-muted
                "
        @click="
          sidebar.toggle()
        "
      >
        <PanelLeft
          :size="18"
        />
      </button>
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
        <LayoutDashboard
          :size="18"
        />

        <span
          v-if="
            !sidebar.collapsed
          "
        >
          Dashboard
        </span>
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
        <Car
          :size="18"
        />

        <span
          v-if="
            !sidebar.collapsed
          "
        >
          Veículos
        </span>
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
        <SquarePen
          :size="18"
        />

        <span
          v-if="
            !sidebar.collapsed
          "
        >
          Categorias
        </span>
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
        <Calendar
          :size="18"
        />

        <span
          v-if="
            !sidebar.collapsed
          "
        >
          Locações
        </span>
      </RouterLink>

      <RouterLink
        to="/payments"
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
        <Banknote
          :size="18"
        />

        <span
          v-if="
            !sidebar.collapsed
          "
        >
          Pagamentos
        </span>
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
        <Users
          :size="18"
        />

        <span
          v-if="
            !sidebar.collapsed
          "
        >
          Usuários
        </span>
      </RouterLink>
    </nav>

    <!-- Footer -->

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
        <Settings
          :size="18"
        />

        <span
          v-if="
            !sidebar.collapsed
          "
        >
          Configurações
        </span>
      </RouterLink>
    </div>
  </aside>
</template>