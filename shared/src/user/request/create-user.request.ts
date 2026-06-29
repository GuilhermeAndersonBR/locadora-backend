import z from "zod";
import { UserInput } from "../input/user.input.js";

export const CreateUserRequestSchema = z.object({
    
    name: UserInput.name,

    email: UserInput.email,

    cpf: UserInput.cpf,

    password: UserInput.password

});

export type CreateUserRequest = z.infer<
    typeof CreateUserRequestSchema
>;