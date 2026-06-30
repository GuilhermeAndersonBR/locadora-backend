import z from "zod";

export const GetCategoryResponseSchema = z.object({
    
    id: z.number().int().positive(),

    name: z.string(),

    description: z.string()

});

export type GetCategoryResponse = z.infer<
    typeof GetCategoryResponseSchema
>;
