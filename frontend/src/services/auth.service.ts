import AuthRepository from "@/repositories/auth.repository";

import type { LoginRequest } from "@locadora/shared/auth/request/login.request.js";
import { useAuthStore } from "@/stores/auth";

export class AuthService {

    static async login(
        data: LoginRequest
    ) {

        const response =
            await AuthRepository.login(
                data
            );

        const authStore = useAuthStore();

        authStore.login(
            response.token,
            response.user
        );

        return response;
    
    };

};