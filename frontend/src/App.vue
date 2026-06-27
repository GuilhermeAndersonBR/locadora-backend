<script setup lang="ts">
  import HeaderComponent from './components/HeaderComponent.vue';
  import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster />
  <HeaderComponent />
  <main class="flex flex-col min-h-screen">
    <RouterView />
  </main>
</template>
