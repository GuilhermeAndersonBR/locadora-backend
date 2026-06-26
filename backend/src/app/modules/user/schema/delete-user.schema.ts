import z from "zod";
import { ZodSchema } from "zod/v3";
import { UserField } from "../field/user.fields.js";

const DeleteUserSchema = z.object({

    password: UserField.password
    
});

type DeleteUserSchema = ZodSchema<
    z.infer<
        typeof DeleteUserSchema
    >
>;

export default DeleteUserSchema;