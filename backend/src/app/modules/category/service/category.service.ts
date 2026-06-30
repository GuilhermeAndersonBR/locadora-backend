import { UpdateCategoryRequest } from "@locadora/shared/category/request/update-category.request.js";
import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import CategoryRepository from "../repository/category.repository.js";

import { CreateCategoryRequest } from "@locadora/shared/category/request/create-category.request.js";
import { GetAllCategoryResponse } from "@locadora/shared/category/response/get-all-category.response.js";
import { GetCategoryResponse } from "@locadora/shared/category/response/get-category.response.js";

export default abstract class CategoryService {

    public static async getAll(

    ): Promise<GetAllCategoryResponse> {

        const categories = await CategoryRepository.getAll();

        return categories;

    };

    public static async findById(
        id: number
    ): Promise<GetCategoryResponse> {

        const category = await CategoryRepository.findById(
            id
        );

        if(!category)
            throw new NotFoundError(
                "CATEGORY_NOT_FOUND"
            );

        return {
            id: category.id,
            name: category.name,
            description: category.description
        };

    };

    public static async create(
        data: TypedBody<CreateCategoryRequest>
    ): Promise<Record<string, any>> {

        const categoryId = await CategoryRepository.create(
            data
        );

        return {
            id: categoryId
        };

    };

    public static async update(
        data: TypedBody<UpdateCategoryRequest> & {
            id: number
        }
    ): Promise<Record<string, any>> {

        const category = await CategoryRepository.findById(
            data.id
        );
        
        await CategoryRepository.update(
            data
        );

        return {};

    };

    public static async delete(
        id: number
    ): Promise<Record<string, any>> {

        const category = await CategoryRepository.findById(
            id
        );

        if(!category)
            throw new NotFoundError(
                "CATEGORY_NOT_FOUND"
            );

        await CategoryRepository.delete(
            id
        );

        return {};

    };

};