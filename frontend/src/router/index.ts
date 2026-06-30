import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import VehicleListView from "@/views/vehicle/VehicleListView.vue";
import VehicleCreateView from "@/views/vehicle/VehicleCreateView.vue";
import VehicleEditView from "@/views/vehicle/VehicleEditView.vue";
import CategoryListView from "@/views/category/CategoryListView.vue";
import EditCategoryView from "@/views/category/EditCategoryView.vue";
import CreateCategoryView from "@/views/category/CreateCategoryView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";

const routes = [

    {
        path: "/",
        name: "home",
        component: HomeView
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: {
            layout: "dashboard",
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/login",
        name: "login",
        component: LoginView,
        meta: {
            layout: "auth",
        }
    },

    {
        path: "/vehicles",
        name: "vehicles",
        component: () => VehicleListView,
        meta: {
            layout: "dashboard",
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/vehicle/create",
        name: "vehicle-create",
        component: () => VehicleCreateView,
        meta: {
            layout: "dashboard",
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/vehicle/:id/edit",
        name: "vehicle-edit",
        component: () => VehicleEditView,
        meta: {
            layout: "dashboard",
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/categories",
        name: "categories",
        component: () => CategoryListView,
        meta: {
            layout: "dashboard",
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/category/create",
        name: "category-create",
        component: () => CreateCategoryView,
        meta: {
            layout: "dashboard",
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/category/:id/edit",
        name: "category-edit",
        component: () => EditCategoryView,
        meta: {
            layout: "dashboard",
            auth: true,
            role: "ADMIN"
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

export const router = createRouter({

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