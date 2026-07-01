import { api } from "@/api/client";
import { AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "vue-sonner";
import TranslationService from "./translation.service";

export type APIResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
};

interface RequestOptions extends AxiosRequestConfig {

    toast?: boolean;

};

export default abstract class RequestService {

    public static async request<T>(
        options: RequestOptions
    ): Promise<APIResponse<T>> {
        
        try {

            const { data } = await api.request<
                APIResponse<T>
            >(
                options
            );

            if(
                options.toast &&
                data.message
            ) {

                toast.success(
                    TranslationService.translate(
                        data.message
                    )
                );

            }

            return data;

        } catch (error: any) {

            if(
                options.toast &&
                error.response?.data?.message
            ) {

                toast.error(
                    TranslationService.translate(
                        error.response.data.message
                    )
                );

            }

            return error.response?.data;

        };

    };

};