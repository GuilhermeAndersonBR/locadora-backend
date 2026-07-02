<script setup lang="ts">
import VehicleFilters from "@/components/vehicle/VehicleFilters.vue";
import VehicleTable from "@/components/vehicle/VehicleTable.vue";
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
          Veículos
        </h1>

        <p
          class="
                        text-muted-foreground
                    "
        >
          Gerencie todos os veículos cadastrados.
        </p>
      </div>

      <Button
        @click="
          router.push(
            '/vehicle/create'
          )
        "
      >
        <Plus class="mr-2 h-4 w-4" />

        Novo veículo
      </Button>
    </div>

    <VehicleFilters />

    <VehicleTable />
  </div>
</template>