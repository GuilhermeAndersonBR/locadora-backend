import z from "zod";
import { ZodSchema } from "zod/v3";
import { UserField } from "../field/user.fields.js";

const CreateUserSchema = z.object({
    
    name: UserField.name,

    email: UserField.email,

    cpf: UserField.cpf,

    password: UserField.password

});

type CreateUserSchema = ZodSchema<
    z.infer<
        typeof CreateUserSchema
    >
>;

export default CreateUserSchema;