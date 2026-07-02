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
import RentalCreateView from "@/views/rental/RentalCreateView.vue";
import RentalsView from "@/views/rental/RentalsView.vue";
import PaymentListView from "@/views/payments/PaymentListView.vue";
import MyPaymentListView from "@/views/payments/MyPaymentListView.vue";

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
            auth: true,
            role: "ADMIN"
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
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/vehicle/create",
        name: "vehicle-create",
        component: () => VehicleCreateView,
        meta: {
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/vehicle/:id/edit",
        name: "vehicle-edit",
        component: () => VehicleEditView,
        meta: {
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/categories",
        name: "categories",
        component: () => CategoryListView,
        meta: {
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/category/create",
        name: "category-create",
        component: () => CreateCategoryView,
        meta: {
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/category/:id/edit",
        name: "category-edit",
        component: () => EditCategoryView,
        meta: {
            auth: true,
            role: "ADMIN"
        }
    },

    {
        path: "/my-rents",
        name: "my-rents",
        component: () => RentalsView,
        meta: {
            auth: true
        }
    },

    {
        path: "/rent",
        name: "rental",
        component: RentalCreateView,
        meta: {
            auth: true
        }
    },

    {
        path: "/payments",
        name: "payments",
        component: () => PaymentListView
    },

    {
        path: "/my-payments",
        name: "my-payments",
        component: () => MyPaymentListView
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