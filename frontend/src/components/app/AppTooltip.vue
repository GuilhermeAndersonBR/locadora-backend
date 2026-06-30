<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

const props =defineProps<{
    text: string;
}>();
</script>

<template>
    <TooltipProvider>

        <Tooltip>

            <TooltipTrigger
                as-child
            >
                <slot />
            </TooltipTrigger>

            <TooltipContent>
                {{ props.text }}
            </TooltipContent>

        </Tooltip>

    </TooltipProvider>
</template>