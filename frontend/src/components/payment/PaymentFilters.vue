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
                    md:flex-wrap
                "
      >
        <!-- Locação -->
        <div class="min-w-[180px]">
          <AppInput
            label="Locação"
            placeholder="#123"
          />
        </div>

        <!-- Cliente -->
        <div class="min-w-[220px]">
          <AppInput
            label="Cliente"
            placeholder="Nome do cliente"
          />
        </div>

        <!-- Método -->
        <div class="min-w-[200px]">
          <label
            class="
                            mb-2
                            block
                            text-sm
                            font-medium
                        "
          >
            Método
          </label>

          <select
            class="
                            flex
                            h-10
                            w-full
                            rounded-md
                            border
                            bg-background
                            px-3
                            py-2
                        "
          >
            <option>
              Todos métodos
            </option>

            <option>
              PIX
            </option>

            <option>
              Cartão
            </option>

            <option>
              Dinheiro
            </option>

            <option>
              Boleto
            </option>
          </select>
        </div>

        <!-- Status -->
        <div class="min-w-[200px]">
          <label
            class="
                            mb-2
                            block
                            text-sm
                            font-medium
                        "
          >
            Status
          </label>

          <select
            class="
                            flex
                            h-10
                            w-full
                            rounded-md
                            border
                            bg-background
                            px-3
                            py-2
                        "
          >
            <option>
              Todos status
            </option>

            <option>
              Pendente
            </option>

            <option>
              Pago
            </option>

            <option>
              Cancelado
            </option>
          </select>
        </div>

        <!-- Data inicial -->
        <div class="min-w-[180px]">
          <AppInput
            type="date"
            label="De"
          />
        </div>

        <!-- Data final -->
        <div class="min-w-[180px]">
          <AppInput
            type="date"
            label="Até"
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