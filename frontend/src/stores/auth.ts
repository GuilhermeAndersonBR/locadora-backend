
import { api } from "@/api/client";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore =
    defineStore(
        "auth",
        () => {

            const token =
                ref<string>();

            async function login(
                email: string,
                password: string
            ) {

                const response =
                    await api.post(
                        "/auth/login",
                        {
                            email,
                            password
                        }
                    );

                token.value =
                    response.data.token;

            }

            return {
                token,
                login
            };

        }
    );