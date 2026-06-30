<script setup lang="ts">
import RequestService, {
    type APIResponse
} from "@/services/request.service";

import {
    Card,
    CardContent
} from "@/components/ui/card";

import CategoryActions
    from "./CategoryActions.vue";

import type {
    GetAllCategoryResponse,
} from "@locadora/shared/category/response/get-all-category.response.js";

import {
    onMounted,
    ref
} from "vue";

import {
    useRouter
} from "vue-router";

const router = useRouter();

const categories =
    ref<GetAllCategoryResponse>(
        []
    );

onMounted(
    async () => {

        const result =
            await RequestService.request<
                GetAllCategoryResponse
            >({

                method: "GET",

                url: "/category"

            });

        if(result?.success)
            categories.value =
                result.data ?? [];

    }
);

async function deleteCategory(
    id: number
) {

    const result =
        await RequestService.request<
            APIResponse<any>
        >({

            method: "DELETE",

            url:
                `/category/${id}`

        });

    if(result?.success)
        router.go(0);

}
</script>

<template>

    <Card>

        <CardContent
            class="p-0"
        >

            <table
                class="w-full"
            >

                <thead
                    class="
                        border-b
                        bg-muted/50
                    "
                >

                    <tr>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            ID
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Nome
                        </th>

                        <th
                            class="
                                p-4
                                text-left
                            "
                        >
                            Descrição
                        </th>

                        <th
                            class="
                                p-4
                                text-right
                            "
                        >
                            Ações
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr
                        v-for="
                            category
                            in categories
                        "
                        :key="
                            category.id
                        "
                        class="
                            border-b
                        "
                    >

                        <td
                            class="
                                p-4
                            "
                        >
                            {{ category.id }}
                        </td>

                        <td
                            class="
                                p-4
                            "
                        >
                            {{ category.name }}
                        </td>

                        <td
                            class="
                                p-4
                                text-muted-foreground
                            "
                        >
                            {{
                                category.description
                                || "-"
                            }}
                        </td>

                        <td
                            class="
                                flex
                                justify-end
                                p-4
                            "
                        >

                            <CategoryActions

                                :category-id="
                                    category.id
                                "

                                @edit="
                                    id =>
                                        router.push(
                                            `/category/${id}/edit`
                                        )
                                "

                                @delete="
                                    deleteCategory
                                "

                            />

                        </td>

                    </tr>

                </tbody>

            </table>

        </CardContent>

    </Card>

</template>