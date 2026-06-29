import { api } from "@/api/client";

export default abstract class AuthRepository {

    public static async login(
        data: 
    ): Promise<any> {

        const response = await api.post(
            "/auth/login",
            data
        );

        return response.data;

    };

    public static async register(
        data: any
    ): Promise<any> {

        const response = await api.post(
            "/auth/register",
            data
        );

        return response.data;

    };

};