<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import UserDropdown from "./UserDropdown.vue";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/stores/auth.ts";
import ModeToggle from "../ModeToggle.vue";
import Button from "../ui/button/Button.vue";

const auth = useAuthStore();

const router = useRouter();
</script>

<template>
    <header
        class="
            border-b
            bg-background
            px-6
            py-3
        "
    >
        <div
            class="
                mx-auto
                flex
                max-w-7xl
                items-center
                justify-between
            "
        >
            <div class="flex items-center gap-8">

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
                            <RouterLink
                                to="/"
                                class="px-3 py-2"
                            >
                                Home
                            </RouterLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <RouterLink
                                to="/vehicles"
                                class="px-3 py-2"
                            >
                                Veículos
                            </RouterLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <RouterLink
                                to="/rentals"
                                class="px-3 py-2"
                            >
                                Meus aluguéis
                            </RouterLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

            </div>

            <ModeToggle />

            <UserDropdown 
                v-if="auth.isAuthenticated" 
            />
            <Button
                v-else
                @click="router.push('/login')"
            >
                Entrar
            </Button>
        </div>
    </header>
</template>