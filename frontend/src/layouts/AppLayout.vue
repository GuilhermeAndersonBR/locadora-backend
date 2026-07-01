<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/layout/AppHeader.vue";
</script>

<template>
    <div class="flex h-screen">

        <div class="flex flex-1 flex-col">

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