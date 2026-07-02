<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";

import { useSidebarStore }
    from "@/stores/sidebar";
import { RouterView } from "vue-router";

const sidebar = useSidebarStore();
</script>

<template>
  <div class="flex h-screen">
    <AppSidebar />

    <div
      class="
                transition-all
                duration-300
                flex
                flex-1
                flex-col
            "
      :class="
        sidebar.collapsed
          ? 'ml-20'
          : 'ml-64'
      "
    >
      <AppHeader />

      <main
        class="
                flex-1
                overflow-auto
                p-6
            "
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>