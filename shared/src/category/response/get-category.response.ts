import z from "zod";

export const CreateCategoryResponseSchema = z.array(z.object({
    
    id: z.number().int().positive(),

    name: z.string(),

    description: z.string()

}));

export type CreateCategoryResponse = z.infer<
    typeof CreateCategoryResponseSchema
>;
