import z from "zod";
import { UserInput } from "../input/user.input.js";

export const UpdateUserRequestSchema = z.object({
    
    name: UserInput.name.optional(),

    email: UserInput.email.optional(),

    cpf: UserInput.cpf.optional(),

    password: UserInput.password

}).refine(
    (data) => {
        return Object.values(data).some(
            (value) => value !== undefined
        );
    },
    {
        message: "NO_FIELDS_TO_UPDATE"
    }
);

export type UpdateUserRequest = z.infer<
    typeof UpdateUserRequestSchema
>;