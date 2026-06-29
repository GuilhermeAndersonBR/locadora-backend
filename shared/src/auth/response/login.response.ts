import z from "zod";
import { UserInput } from "../../user/input/user.input.js";
import { AuthInput } from "../input/auth.input.js";

export const LoginResponseSchema = z.object({
    
    token: AuthInput.token,

});

export type LoginResponse = z.infer<
    typeof LoginResponseSchema
>;