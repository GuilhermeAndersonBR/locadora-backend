<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import AppLayout from "./layouts/AppLayout.vue";

const route = useRoute();

const layout = computed(() => {

    switch(route.meta.layout) {

        case "auth":
            return AuthLayout;

        case "dashboard":
            return DashboardLayout;
        default:
            return AppLayout;

    };

});
</script>

<template>
    <component :is="layout">

        <RouterView />

    </component>
    <Toaster />
</template>