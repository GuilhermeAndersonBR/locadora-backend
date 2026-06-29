import z from "zod";
import { UserInput } from "../input/user.input.js";

export const UpdateUserPasswordRequestSchema = z.object({

    currentPassword: UserInput.password,

    newPassword: UserInput.password

});

export type UpdateUserPasswordRequest = z.infer<
    typeof UpdateUserPasswordRequestSchema
>;