<script setup lang="ts">
import {
    MoreVertical,
    Pencil,
    Trash2
} from "@lucide/vue";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const props = defineProps<{
    vehicleId: number;
}>();

const emit = defineEmits<{
    edit: [number];
    delete: [number];
}>();
</script>

<template>

    <AlertDialog>

        <DropdownMenu>

            <DropdownMenuTrigger as-child>

                <button
                    class="
                        rounded-md
                        p-2
                        hover:bg-muted
                    "
                >
                    <MoreVertical
                        class="h-4 w-4"
                    />
                </button>

            </DropdownMenuTrigger>

            <DropdownMenuContent>

                <DropdownMenuItem
                    @click="
                        emit(
                            'edit',
                            vehicleId
                        )
                    "
                >
                    <Pencil
                        class="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    Editar
                </DropdownMenuItem>

                <AlertDialogTrigger as-child>

                    <DropdownMenuItem
                        @select.prevent
                    >
                        <Trash2
                            class="
                                mr-2
                                h-4
                                w-4
                            "
                        />

                        Excluir
                    </DropdownMenuItem>

                </AlertDialogTrigger>

            </DropdownMenuContent>

        </DropdownMenu>

        <AlertDialogContent>

            <AlertDialogHeader>

                <AlertDialogTitle>
                    Excluir veículo?
                </AlertDialogTitle>

                <AlertDialogDescription>
                    Esta ação não pode ser desfeita.
                </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>

                <AlertDialogCancel>
                    Cancelar
                </AlertDialogCancel>

                <AlertDialogAction
                    @click="
                        emit(
                            'delete',
                            vehicleId
                        )
                    "
                >
                    Excluir
                </AlertDialogAction>

            </AlertDialogFooter>

        </AlertDialogContent>

    </AlertDialog>

</template>