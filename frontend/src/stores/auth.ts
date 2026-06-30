import { defineStore } from "pinia";

import type { CreateUserResponse } from "@locadora/shared/user/response/create-user.res.js";
import router from "@/router";

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

            if(user.role === "ADMIN") 
                router.push("/dashboard");

            else
                router.push("/");

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

            router.push("/");

        }

    },

    getters: {
        isAuthenticated: state => !!state.token,

        isAdmin: state =>
            state.user?.role === "ADMIN"
    }

});