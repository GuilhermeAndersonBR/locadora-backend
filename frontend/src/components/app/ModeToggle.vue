<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'

import { ToggleRight, ToggleLeft } from '@lucide/vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { computed } from 'vue'

const mode = useColorMode({
    disableTransition: false
})

const changeColorMode = computed(
    () => mode.value === 'dark' ? 'light' : 'dark'
);
</script>

<template>
    <Button variant="outline" @click="
        mode = changeColorMode
    ">

    <ToggleRight class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <ToggleLeft class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    <span class="sr-only">Toggle theme</span>
    </Button>
</template>
