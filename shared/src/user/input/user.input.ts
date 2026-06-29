import { z } from "zod";
import UserRole from "../types/user-role.type.js";

export const UserInput = {

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
        .string()
        .transform(cpf => cpf.replace(/\D/g, ""))
        .refine(
            cpf => cpf.length === 11,
            "CPF_INVALID"
        ),

    password: z
        .string({
            error: "PASSWORD_REQUIRED"
        })
        .trim()
        .min(8, "PASSWORD_TOO_SHORT"),
        
    role: z.enum(
        Object.values(UserRole), 
        {
            error: "ROLE_REQUIRED"
        }
    )

};