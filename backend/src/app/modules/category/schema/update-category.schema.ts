import z from "zod";
import { CategoryField } from "../field/category.field.js";
import { ZodSchema } from "zod/v3";

export const UpdateCategorySchema = z.object({

    name: CategoryField.name.optional(),

    description: CategoryField.description.optional()

}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "EMPTY_BODY"
    }
);

type UpdateCategorySchema = ZodSchema<
    z.infer<
        typeof UpdateCategorySchema
    >
>;

export default UpdateCategorySchema;

