<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import ModeToggle
    from "../app/ModeToggle.vue";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";

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

import Button
    from "../ui/button/Button.vue";

import {
    ChevronDown,
    LogOut,
    Settings,
    User,
    Car,
    ClipboardList
} from "@lucide/vue";

import {
    RouterLink
} from "vue-router";

const auth =
    useAuthStore();
</script>

<template>

    <header
        class="
            flex
            h-16
            items-center
            justify-between
            border-b
            px-6
            shadow-md
        "
    >

        <div
            class="
                flex
                items-center
                gap-8
            "
        >

            <RouterLink
                to="/"
                class="
                    text-xl
                    font-bold
                "
            >
                Locadora
            </RouterLink>

            <NavigationMenu>

                <NavigationMenuList>

                    <NavigationMenuItem>

                        <NavigationMenuLink as-child>

                            <RouterLink
                                to="/"
                                class="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                Início
                            </RouterLink>

                        </NavigationMenuLink>

                    </NavigationMenuItem>

                    <NavigationMenuItem>

                        <NavigationMenuLink as-child>

                            <RouterLink
                                to="/rent"
                                class="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                Alugar veículo
                            </RouterLink>

                        </NavigationMenuLink>

                    </NavigationMenuItem>

                    <NavigationMenuItem
                        v-if="
                            auth.isAuthenticated
                        "
                    >

                        <NavigationMenuLink as-child>

                            <RouterLink
                                to="/my-rents"
                                class="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                Meus aluguéis
                            </RouterLink>

                        </NavigationMenuLink>

                    </NavigationMenuItem>

                    <NavigationMenuItem
                        v-if="
                            auth.isAuthenticated
                        "
                    >

                        <NavigationMenuLink as-child>

                            <RouterLink
                                to="/my-payments"
                                class="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                Meus pagamentos
                            </RouterLink>

                        </NavigationMenuLink>

                    </NavigationMenuItem>

                </NavigationMenuList>

            </NavigationMenu>

        </div>

        <div
            class="
                flex
                items-center
                gap-4
            "
        >

            <ModeToggle />

            <DropdownMenu
                v-if="
                    auth.user
                "
            >

                <DropdownMenuTrigger
                    class="
                        flex
                        items-center
                    "
                >

                    <Avatar>

                        <AvatarImage
                            :src="
                                auth.user
                                    ?.images?.[0]
                                    ?.url ?? ''
                            "
                        />

                        <AvatarFallback>
                            {{
                                auth.user
                                    ?.name
                                    .slice(0,2)
                            }}
                        </AvatarFallback>

                    </Avatar>

                    <ChevronDown
                        class="
                            ml-2
                            h-4
                            w-4
                        "
                    />

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

                        <p
                            class="
                                font-medium
                            "
                        >
                            {{
                                auth.user.name
                            }}
                        </p>

                        <p
                            class="
                                text-xs
                                text-muted-foreground
                            "
                        >
                            {{
                                auth.user.email
                            }}
                        </p>

                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <User
                            class="
                                mr-2
                                h-4
                                w-4
                            "
                        />
                        Perfil
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Settings
                            class="
                                mr-2
                                h-4
                                w-4
                            "
                        />
                        Configurações
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        @click="
                            auth.logout
                        "
                    >
                        <LogOut
                            class="
                                mr-2
                                h-4
                                w-4
                            "
                        />
                        Sair
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            <div
                v-else
                class="
                    flex
                    gap-2
                "
            >

                <RouterLink
                    to="/register"
                >
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        Cadastrar
                    </Button>
                </RouterLink>

                <RouterLink
                    to="/login"
                >
                    <Button
                        size="sm"
                    >
                        Entrar
                    </Button>
                </RouterLink>

            </div>

        </div>

    </header>

</template>