import axios from 'axios';

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

        return response;
    
    },

    (error) => {

        return Promise.reject(error);
    
    }

);