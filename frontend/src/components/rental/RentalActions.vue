<script setup lang="ts">
import {
    MoreVertical,
    Ban,
    Check,
    Eye,
    CreditCard
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
    rentalId: number;
    status: string;
}>();

const emit = defineEmits<{
    pay: [number];
    details: [number];
    finish: [number];
    cancel: [number];
}>();
</script>

<template>

    <AlertDialog>

        <DropdownMenu>

            <DropdownMenuTrigger
                as-child
            >

                <button
                    class="
                        rounded-md
                        p-2
                        hover:bg-muted
                    "
                >

                    <MoreVertical
                        class="
                            h-4
                            w-4
                        "
                    />

                </button>

            </DropdownMenuTrigger>

            <DropdownMenuContent>

                <DropdownMenuItem
                    @click="
                        emit(
                            'pay',
                            rentalId
                        )
                    "
                >
                    <CreditCard class="mr-2 h-4 w-4" />

                    Pagar

                </DropdownMenuItem>

                <DropdownMenuItem
                    @click="
                        emit(
                            'details',
                            rentalId
                        )
                    "
                >

                    <Eye
                        class="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    Detalhes

                </DropdownMenuItem>

                <DropdownMenuItem
                    v-if="
                        status ===
                        'ACTIVE'
                    "
                    @click="
                        emit(
                            'finish',
                            rentalId
                        )
                    "
                >

                    <Check
                        class="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    Finalizar

                </DropdownMenuItem>

                <AlertDialogTrigger
                    v-if="
                        status ===
                        'ACTIVE'
                    "
                    as-child
                >

                    <DropdownMenuItem
                        @select.prevent
                    >

                        <Ban
                            class="
                                mr-2
                                h-4
                                w-4
                            "
                        />

                        Cancelar

                    </DropdownMenuItem>

                </AlertDialogTrigger>

            </DropdownMenuContent>

        </DropdownMenu>

        <AlertDialogContent>

            <AlertDialogHeader>

                <AlertDialogTitle>
                    Cancelar locação?
                </AlertDialogTitle>

                <AlertDialogDescription>
                    Esta ação irá cancelar a locação e não poderá ser desfeita.
                </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>

                <AlertDialogCancel>
                    Voltar
                </AlertDialogCancel>

                <AlertDialogAction
                    @click="
                        emit(
                            'cancel',
                            rentalId
                        )
                    "
                >
                    Cancelar locação
                </AlertDialogAction>

            </AlertDialogFooter>

        </AlertDialogContent>

    </AlertDialog>

</template>