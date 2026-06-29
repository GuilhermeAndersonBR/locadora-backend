import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

export const api = axios.create({
    
    baseURL: 'http://localhost:3000',

    headers: {
        'Content-Type': 'multipart/form-data'
    },

    withCredentials: true,

    timeout: 10000

});