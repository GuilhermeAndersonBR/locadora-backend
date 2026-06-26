import z from "zod";
import { ZodSchema } from "zod/v3";
import { UserField } from "../field/user.fields.js";

const UpdateUserRoleSchema = z.object({

    newRole: UserField.role,

    password: UserField.password

});

type UpdateUserRoleSchema = ZodSchema<
    z.infer<
        typeof UpdateUserRoleSchema
    >
>;

export default UpdateUserRoleSchema;