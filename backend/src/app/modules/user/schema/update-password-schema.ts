import z from "zod";
import { ZodSchema } from "zod/v3";
import { UserField } from "../field/user.fields.js";

const UpdateUserPasswordSchema = z.object({

    currentPassword: UserField.password,

    newPassword: UserField.password

});

type UpdateUserPasswordSchema = ZodSchema<
    z.infer<
        typeof UpdateUserPasswordSchema
    >
>;

export default UpdateUserPasswordSchema;