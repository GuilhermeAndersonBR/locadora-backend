import z from "zod";
import { AuthInput } from "../input/auth.input.js";
import { CreateUserRequestSchema } from "../../user/request/create-user.request.js";
import { UserInput } from "../../user/input/user.input.js";
import { CreateImageResponseSchema } from "../../image/response/create-image.res.js";
import { CreateUserResponseSchema } from "../../user/response/create-user.res.js";

export const RegisterResponseSchema = z.object({

    token: AuthInput.token,

    user: CreateUserResponseSchema

});

export type RegisterResponse = z.infer<
    typeof RegisterResponseSchema
>;