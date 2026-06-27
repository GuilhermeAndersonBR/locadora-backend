<script setup lang="ts">
    import { Icon } from '@iconify/vue'
    import { useColorMode } from '@vueuse/core'
    import { Button } from '@/components/ui/button'

    const mode = useColorMode()
</script>

<template>
    <Button variant="outline" @click="mode = mode === 'dark' ? 'light' : 'dark'">
        <Icon icon="radix-icons:shadow" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span class="sr-only">Toggle theme</span>
    </Button>
</template>