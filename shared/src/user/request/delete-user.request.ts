import z from "zod";
import { UserInput } from "../input/user.input.js";

export const DeleteUserRequestSchema = z.object({

    password: UserInput.password
    
});

export type DeleteUserRequest = z.infer<
    typeof DeleteUserRequestSchema
>;