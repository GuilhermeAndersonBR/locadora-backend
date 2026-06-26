import z from "zod";
import { ZodSchema } from "zod/v3";
import { UserField } from "../../user/field/user.fields.js";

const LoginSchema = z.object({
    
    email: UserField.email,

    password: UserField.password

});

type LoginSchema = ZodSchema<
    z.infer<
        typeof LoginSchema
    >
>;

export default LoginSchema;