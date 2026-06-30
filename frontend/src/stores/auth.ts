import router from "@/router";
import { defineStore } from "pinia";

import type { CreateUserResponse } from "@locadora/shared/user/response/create-user.res.js";

function safeParse<T>(item: string): T | null {
    
    const raw = localStorage.getItem(item);

    try {

        const data = raw ? JSON.parse(raw) : null;

        return data;
    
    } catch (error) {

        localStorage.removeItem(item);
        
        return null;
    
    };

};

export const useAuthStore = defineStore("auth", {

    state: () => ({
        token: localStorage.getItem("token") || "",
        user: safeParse<CreateUserResponse>("user")
    }),

    actions: {

        login(token: string, user: CreateUserResponse) {

            this.token = token;
            this.user = user;

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

        },

        logout() {

            this.token = "";
            this.user = null;

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            router.push({
                name: "/"
            });

        }

    },

    getters: {
        isAuthenticated: state => !!state.token,

        isAdmin: state =>
            state.user?.role === "ADMIN"
    }

});