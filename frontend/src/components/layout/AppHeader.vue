<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import ModeToggle from "../app/ModeToggle.vue";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import { 
    ChevronDown, 
    LogOut, 
    Settings, 
    User 
} from "@lucide/vue";
import Button from "../ui/button/Button.vue";
import { RouterLink } from "vue-router";

const auth = useAuthStore();
</script>

<template>
    <header
        class="
            flex
            h-16
            items-center
            justify-end
            border-b
            px-6
            gap-4
        "
    >

        <ModeToggle />

        <DropdownMenu
            v-if="auth.user"
        >

            <DropdownMenuTrigger class="
                flex
                items-center
            ">

                <Avatar>
                    <AvatarImage
                        :src="
                            auth.user?.images?.[0]?.url ?? ''
                        "
                    />

                    <AvatarFallback>
                        {{
                            auth.user?.name.slice(0, 2)
                        }}
                    </AvatarFallback>
                </Avatar>

                <ChevronDown class="ml-2 h-4 w-4" />

            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
            >

                <div
                    class="
                        px-2
                        py-1
                    "
                >
                    <p class="font-medium">
                        {{ auth.user?.name }}
                    </p>

                    <p
                        class="
                            text-xs
                            text-muted-foreground
                        "
                    >
                        {{ auth.user?.email }}
                    </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <User />Perfil
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Settings />Configurações
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    @click="auth.logout"
                >
                    <LogOut /> Sair
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

        <div 
            class="
                flex
                items-center
                gap-2
            "
            v-else
        >

            <RouterLink to="/register">
                <Button
                    variant="outline"
                    size="sm"
                >
                    Cadastrar
                </Button>
            </RouterLink>

            <RouterLink to="/login">
                <Button
                    size="sm"
                >
                    Entrar
                </Button>
            </RouterLink>
        </div>

    </header>
</template>