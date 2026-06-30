import z from "zod";
import { UserInput } from "../../user/input/user.input.js";
import { AuthInput } from "../input/auth.input.js";
import { CreateUserResponseSchema } from "../../user/response/create-user.res.js";

export const LoginResponseSchema = z.object({
    
    token: AuthInput.token,

    user: CreateUserResponseSchema

});

export type LoginResponse = z.infer<
    typeof LoginResponseSchema
>;