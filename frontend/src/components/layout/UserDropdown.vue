<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Icon } from '@iconify/vue'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

const router = useRouter();
const auth = useAuthStore();

function logout() {

    auth.logout();

    router.push("/login");

}
</script>

<template>
    <DropdownMenu>

        <DropdownMenuTrigger class="cursor-pointer flex items-center">

            <Avatar>

                <AvatarImage
                    :src="auth.user?.images.find(image => image.variant === 'avatar')?.url || ''"
                />

                <AvatarFallback>
                    {{
                        auth.user?.name
                            ?.substring(0, 2)
                            .toUpperCase()
                    }}
                </AvatarFallback>

            </Avatar>

            <Icon 
                icon="radix-icons:triangle-down" 
            />

        </DropdownMenuTrigger>

        <DropdownMenuContent
            align="end"
            class="w-56"
        >

            <DropdownMenuLabel>

                <div>
                    <div class="font-bold">
                        {{ auth.user?.name }}
                    </div>

                    <div
                        class="
                            text-xs
                            text-muted-foreground
                        "
                    >
                        {{ auth.user?.email }}
                    </div>
                </div>

            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
                @click="router.push('/')"
            >
                <Icon 
                    icon="radix-icons:home" 
                />
                Home
            </DropdownMenuItem>

            <DropdownMenuItem
                @click="router.push('/settings')"
            >
                <Icon icon="radix-icons:gear" />
                Configurações
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
                @click="logout"
            >
                <Icon icon="radix-icons:exit" /> 
                Sair
            </DropdownMenuItem>

            <DropdownMenuItem
                v-if="auth.isAdmin"
                @click="router.push('/admin')"
            >
                <Icon icon="radix-icons:bar-chart" />
                Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem
                v-if="auth.isAdmin"
                @click="router.push('/admin/vehicles')"
            >
                <Icon icon="radix-icons:pencil-2" />
                Gerenciar veículos
            </DropdownMenuItem>

        </DropdownMenuContent>

    </DropdownMenu>
</template>