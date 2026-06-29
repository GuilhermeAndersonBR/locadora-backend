import z from "zod";
import { UserInput } from "../input/user.input.js";

export const UpdateUserRoleRequestSchema = z.object({

    newRole: UserInput.role,

    password: UserInput.password

});

export type UpdateUserRoleRequest = z.infer<
    typeof UpdateUserRoleRequestSchema
>;