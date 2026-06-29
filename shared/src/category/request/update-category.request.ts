import z from "zod";
import { CategoryInput } from "../input/category.input.js";

export const UpdateCategoryRequestSchema = z.object({

    name: CategoryInput.name.optional(),

    description: CategoryInput.description.optional()

}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "EMPTY_BODY"
    }
);

export type UpdateCategoryRequest = z.infer<
    typeof UpdateCategoryRequestSchema
>;