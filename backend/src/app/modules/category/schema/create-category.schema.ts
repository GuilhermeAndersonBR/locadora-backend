import z from "zod";
import { ZodSchema } from "zod/v3";
import { CategoryField } from "../field/category.field.js";

const CreateCategorySchema = z.object({
    
    name: CategoryField.name,

    description: CategoryField.description

});

type CreateCategorySchema = ZodSchema<
    z.infer<
        typeof CreateCategorySchema
    >
>;

export default CreateCategorySchema;