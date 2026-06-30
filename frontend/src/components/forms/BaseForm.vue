<script setup lang="ts">
const props = defineProps<{

    loading?: boolean;

    submit?: string;

    loadingSubmit?: string;

}>();

const emit = defineEmits<{
    submit: [];
}>();

import { Button } from "@/components/ui/button";

</script>

<template>
    <form
        class="
            space-y-6
        "
        @submit.prevent="
            emit('submit')
        "
    >

        <slot></slot>

        <Button
            type="submit"
            class="w-full"
            :disabled="loading"
        >
            {{
                loading ? loadingSubmit : submit 
            }}
        </Button>

    </form>
</template>