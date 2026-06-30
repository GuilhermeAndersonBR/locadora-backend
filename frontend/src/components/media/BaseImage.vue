<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{

    images?: {

        variant: string;

        url: string;

    }[];

    variant?: string;

    alt?: string;

    rounded?: boolean;

    cover?: boolean;

}>();

const src = computed(
    () =>
        props.images?.find(

            image =>
                image.variant ===
                props.variant

        )?.url
);    

const error = ref(false);

function onError() {

    error.value = true;

}
</script>

<template>
    <img

        :src="src ?? 'https://via.placeholder.com/150'"

        :alt="alt"

        loading="lazy"

        @error="onError"

        :class="[

            props.rounded
                ? 'rounded-full'
                : 'rounded-md',

            props.cover
                ? 'object-cover'
                : 'object-contain'

        ]"

    />
</template>