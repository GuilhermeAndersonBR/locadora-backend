<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import AppLayout from "./layouts/AppLayout.vue";
import { useAuthStore } from "./stores/auth.ts";

const route = useRoute();

const auth = useAuthStore();
</script>

<template>
  <AuthLayout
    v-if="route.meta.layout === 'auth'"
  />

  <DashboardLayout
    v-if="auth.isAdmin"
  />

  <AppLayout v-else />
    
  <Toaster />
</template>