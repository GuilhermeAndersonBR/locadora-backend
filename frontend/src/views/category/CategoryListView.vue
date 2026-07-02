<script setup lang="ts">
import CategoryFilters from "@/components/category/CategoryFilters.vue";
import CategoryTable from "@/components/category/CategoryTable.vue";

import { Button } from "@/components/ui/button";

import { Plus } from "@lucide/vue";

import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="space-y-6">
    <div
      class="
                flex
                items-center
                justify-between
            "
    >
      <div>
        <h1
          class="
                        text-3xl
                        font-bold
                    "
        >
          Categorias
        </h1>

        <p
          class="
                        text-muted-foreground
                    "
        >
          Gerencie todas as categorias cadastradas.
        </p>
      </div>

      <Button
        @click="
          router.push(
            '/category/create'
          )
        "
      >
        <Plus
          class="
                        mr-2
                        h-4
                        w-4
                    "
        />

        Nova categoria
      </Button>
    </div>

    <CategoryFilters />

    <CategoryTable />
  </div>
</template>