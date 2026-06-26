import z from "zod";
import { ZodSchema } from "zod/v3";
import { UserField } from "../field/user.fields.js";

const UpdateUserSchema = z.object({
    
    name: UserField.name.optional(),

    email: UserField.email.optional(),

    cpf: UserField.cpf.optional(),

    password: UserField.password

}).refine(
    (data) => {
        return Object.values(data).some(
            (value) => value !== undefined
        );
    },
    {
        message: "NO_FIELDS_TO_UPDATE"
    }
);

type UpdateUserSchema = ZodSchema<
    z.infer<
        typeof UpdateUserSchema
    >
>;

export default UpdateUserSchema;