import z from "zod";
import { ZodSchema } from "zod/v3";
import UserRole from "../types/user-role.type.js";
import { CreateImageResponseSchema } from "../../image/response/create-image.res.js";


export const CreateUserResponseSchema = z.object({
    
    id: z.number().int().positive(),

    name: z.string(),

    email: z.string(),

    cpf: z.string(),

    role: z.enum([
        UserRole.ADMIN,
        UserRole.CLIENT
    ]),

    images: z.array(
        CreateImageResponseSchema
    )

});

export type CreateUserResponse = z.infer<
    typeof CreateUserResponseSchema
>;