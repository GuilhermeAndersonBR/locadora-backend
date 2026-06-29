import z from "zod";
import { UserInput } from "../../user/input/user.input.js";

export const LoginRequestSchema = z.object({
    
    email: UserInput.email,

    password: UserInput.password

});

export type LoginRequest = z.infer<
    typeof LoginRequestSchema
>;