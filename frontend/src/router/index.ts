import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/auth/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import { useAuthStore } from "@/stores/auth";

const routes = [

    {
        path: "/login",
        name: "login",
        component: LoginView
    },

    {
        path: "/",
        name: "dashboard",
        component: DashboardView,
        meta: {
            auth: true
        }
    }

];

const router = createRouter({

    history: createWebHistory(),

    routes

});

router.beforeEach((to) => {

    const auth = useAuthStore();

    if (to.meta.auth && !auth.token) {
        return { path: "/login" };
    }

});

export default router;