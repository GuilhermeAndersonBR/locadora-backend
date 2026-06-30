import { z } from "zod";
import UserRole from "../types/user-role.type.js";

export const UserInput = {

    name: z
        .string({
            required_error: "NAME_REQUIRED"
        })
        .trim()
        .min(3, {
            message: "NAME_TOO_SHORT"
        })
        .max(50, {
            message: "NAME_TOO_LONG"
        }),

    email: z
        .string({
            required_error: "EMAIL_REQUIRED"
        })
        .trim()
        .toLowerCase()
        .email({
            message: "INVALID_EMAIL"
        }),

    cpf: z
        .string({
            required_error: "CPF_REQUIRED"
        })
        .transform(cpf => cpf.replace(/\D/g, ""))
        .refine(
            cpf => /^\d{11}$/.test(cpf),
            {
                message: "CPF_INVALID"
            }
        ),

    password: z
        .string({
            required_error: "PASSWORD_REQUIRED"
        })
        .trim()
        .min(8, {
            message: "PASSWORD_TOO_SHORT"
        }),

    role: z.enum([
        UserRole.ADMIN,
        UserRole.CLIENT
    ])

};