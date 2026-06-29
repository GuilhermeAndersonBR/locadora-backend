import z from "zod";
import { UserInput } from "../../user/input/user.input.js";

export const RegisterRequestSchema = z.object({

    name: UserInput.name,

    email: UserInput.email,

    cpf: UserInput.cpf,

    password: UserInput.password

});

export type RegisterRequest = z.infer<
    typeof RegisterRequestSchema
>;