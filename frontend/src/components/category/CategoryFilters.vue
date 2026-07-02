<script setup lang="ts">
import AppInput from "../app/AppInput.vue";

import {
    Card,
    CardContent
} from "@/components/ui/card";

import {
    Button
} from "@/components/ui/button";
</script>

<template>
  <Card>
    <CardContent
      class="
                flex
                flex-col
                gap-4
                pt-6
                lg:flex-row
                lg:items-end
                lg:justify-between
            "
    >
      <!-- Filtros -->
      <div
        class="
                    flex
                    flex-1
                    flex-col
                    gap-4
                    md:flex-row
                "
      >
        <div class="min-w-[250px]">
          <AppInput
            label="Nome"
            placeholder="Nome da categoria"
          />
        </div>

        <div class="flex-1">
          <AppInput
            label="Descrição"
            placeholder="Descrição da categoria"
          />
        </div>
      </div>

      <!-- Ações -->
      <div
        class="
                    flex
                    gap-2
                "
      >
        <Button
          variant="outline"
        >
          Limpar
        </Button>

        <Button>
          Pesquisar
        </Button>
      </div>
    </CardContent>
  </Card>
</template>