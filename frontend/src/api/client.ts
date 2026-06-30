import TranslationService from '@/services/translation.service';
import axios from 'axios';
import { toast } from 'vue-sonner';

export const api = axios.create({
    
    baseURL: 'http://localhost:3000',

    headers: {
        'Content-Type': 'application/json'
    },

    withCredentials: true,

    timeout: 10000

});

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem(
            "token"
        );

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        };

        return config;

    },

);

api.interceptors.response.use(

    (response) => {

        const event = response.data;



        if (event?.success) {

            const message = TranslationService.translate(
                event.message
            );

            toast.success(message);

        };

        return response;
    
    },

    (error) => {

        const event = error?.response?.data;

        if (!event?.success) {

            const message = TranslationService.translate(
                event.message
            );

            toast.error(message);

        };

        return Promise.reject(error);
    
    }

);