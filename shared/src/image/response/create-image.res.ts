import z from "zod";
import { ZodSchema } from "zod/v3";

export const CreateImageResponseSchema = z.object({
    
    variant: z.string(),
    
    url: z.string()

});

export type CreateImageResponse = z.infer<
    typeof CreateImageResponseSchema
>;