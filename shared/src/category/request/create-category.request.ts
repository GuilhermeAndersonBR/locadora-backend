import z from "zod";
import { CategoryInput } from "../input/category.input.js";

export const CreateCategoryRequestSchema = z.object({
    
    name: CategoryInput.name,

    description: CategoryInput.description

});

export type CreateCategoryRequest = z.infer<
    typeof CreateCategoryRequestSchema
>;
