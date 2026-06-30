import { api } from "@/api/client";
import { AxiosError, type AxiosRequestConfig } from "axios";

export type APIResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
};

export default abstract class RequestService {

    public static async request<T>(
        config: AxiosRequestConfig
    ): Promise<APIResponse<T>> {
        
        try {

            const { data } = await api.request<
                APIResponse<T>
            >(
                config
            );

            return data;

        } catch (error) {
            
            if(
                error instanceof AxiosError &&
                error.response?.data
            ) return error.response.data;

            return {
                success: false,
                message: "INTERNAL_SERVER_ERROR",
                data: undefined
            };

        };

    };

};