import ptBR from './i18n/pt-BR.json';
import enUS from './i18n/en-US.json';

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import router from './router/index.ts';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n'

import  "maska";

const pinia = createPinia();

export const i18n = createI18n({
    legacy: false,
    locale: 'pt-BR',
    fallbackLocale: 'en-US',
    messages: {
        'pt-BR': ptBR,
        'en-US': enUS
    }
});

createApp(App)
    .use(pinia)
    .use(router)
    .use(i18n)
    .mount('#app');