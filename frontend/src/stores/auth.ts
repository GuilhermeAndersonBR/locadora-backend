import router from "@/router";
import { defineStore } from "pinia";

type User = {
    id: number,
    name: string,
    email: string,
    cpf: string,
    role: string,
    images: Array<{
        variant: string,
        url: string
    }>
};

export const useAuthStore = defineStore("auth", {

    state: () => ({
        token: localStorage.getItem("token") || "",
        user: JSON.parse(
            localStorage.getItem("user") ?? "null"
        ) as User | null
    }),

    actions: {

        login(token: string, user: User) {

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