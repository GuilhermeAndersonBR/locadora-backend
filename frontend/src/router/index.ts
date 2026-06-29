import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/auth/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import RegisterView from "@/views/auth/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";

const routes = [

    {
        path: "/login",
        name: "login",
        component: LoginView
    },

    {
        path: "/register",
        name: "register",
        component: RegisterView
    },

    {
        path: "/",
        name: "home",
        component: HomeView
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        //meta: {
        //    auth: true,
        //    role: "ADMIN"
        //}
    },

];

const router = createRouter({

    history: createWebHistory(),

    routes

});

router.beforeEach((to) => {

    const auth = useAuthStore();

    if (
        to.meta.auth &&
        !auth.isAuthenticated
    ) {
        return "/";
    }

    if (
        to.meta.role &&
        auth.user.role !== to.meta.role
    ) {
        return "/";
    }

});

export default router;