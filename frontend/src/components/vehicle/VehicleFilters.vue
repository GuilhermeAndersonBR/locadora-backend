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

                <div class="min-w-[220px]">

                    <AppInput
                        label="Placa"
                        placeholder="ABC-1234"
                        mask="@@@-####"
                    />

                </div>

                <div class="min-w-[200px]">

                    <label
                        class="
                            mb-2
                            block
                            text-sm
                            font-medium
                        "
                    >
                        Categoria
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
                            Todas categorias
                        </option>
                    </select>

                </div>

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
                            Disponível
                        </option>

                        <option>
                            Alugado
                        </option>

                        <option>
                            Manutenção
                        </option>
                    </select>

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