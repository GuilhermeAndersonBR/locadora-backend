import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import CategoryRepository from "../repository/category.repository.js";
import CreateCategorySchema from "../schema/create-category.schema.js";
import { UpdateCategorySchema } from "../schema/update-category.schema.js";

export default abstract class CategoryService {

    public static async getAll(

    ): Promise<Record<string, any>> {

        const categories = await CategoryRepository.getAll();

        return categories;

    };

    public static async create(
        data: TypedBody<typeof CreateCategorySchema>
    ): Promise<Record<string, any>> {

        const categoryId = await CategoryRepository.create(
            data
        );

        return {
            id: categoryId
        };

    };

    public static async update(
        data: TypedBody<typeof UpdateCategorySchema> & {
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