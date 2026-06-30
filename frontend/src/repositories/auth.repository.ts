import { api } from "@/api/client";

import type { LoginRequest } from "@locadora/shared/auth/request/login.request.js";
import type { LoginResponse } from "@locadora/shared/auth/response/login.response.js";
import type { RegisterRequest } from "@locadora/shared/auth/request/register.request.js";
import type { RegisterResponse } from "@locadora/shared/auth/response/register.response.js";

export default abstract class AuthRepository {

    public static async login(
        data: LoginRequest
    ): Promise<LoginResponse> {

        const response = await api.post(
            "/auth/login",
            data
        );

        return response.data;

    };

    public static async register(
        data: RegisterRequest
    ): Promise<RegisterResponse> {

        const response = await api.post(
            "/auth/register",
            data
        );

        return response.data;

    };

};