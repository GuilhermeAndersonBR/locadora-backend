import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import VehicleListView from "@/views/vehicle/VehicleListView.vue";
import VehicleCreateView from "@/views/vehicle/VehicleCreateView.vue";
import VehicleEditView from "@/views/vehicle/VehicleEditView.vue";

const routes = [

    {
        path: "/",
        name: "home",
        component: HomeView
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: HomeView,
        meta: {
            layout: "dashboard",
            auth: true
        }
    },

    {
        path: "/login",
        name: "login",
        component: LoginView,
        meta: {
            layout: "auth"
        }
    },

    {
        path: "/vehicles",
        name: "vehicles",
        component: () => VehicleListView,
        meta: {
            layout: "dashboard",
            auth: true
        }
    },

    {
        path: "/vehicle/create",
        name: "vehicle-create",
        component: () => VehicleCreateView,
        meta: {
            layout: "dashboard",
            auth: true
        }
    },

    {
        path: "/vehicle/:id/edit",
        name: "vehicle-edit",
        component: () => VehicleEditView,
        meta: {
            layout: "dashboard",
            auth: true
        }
    },

    {
        path: "/register",
        name: "register",
        component: () => RegisterView,
        meta: {
            layout: "auth"
        }
    }

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
        auth.user?.role !== to.meta.role
    ) {
        return "/";
    }

});

export default router;