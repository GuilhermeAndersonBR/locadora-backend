import { z } from "zod";

export const UserField = {

    name: z
        .string({
            error: "NAME_REQUIRED"
        })
        .trim()
        .min(3, "NAME_TOO_SHORT")
        .max(50, "NAME_TOO_LONG"),

    email: z
        .string({
            error: "EMAIL_REQUIRED"
        })
        .trim()
        .lowercase()
        .email({
            error: "INVALID_EMAIL"
        }),

    cpf: z
        .string(),

    password: z
        .string({
            error: "PASSWORD_REQUIRED"
        })
        .trim()
        .min(8, "PASSWORD_TOO_SHORT"),
        
    role: z.enum([
        "USER",
        "ADMIN"
    ], {
        error: "INVALID_ROLE"
    })

};