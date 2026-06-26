import z from "zod";
import ValidationError from "../errors/validation.error.js";

export default class Validator {

    public static validate<T extends z.ZodTypeAny>(
        schema: T,
        data: unknown
    ): z.infer<T> {
        
        const result = schema.safeParse(data);

        if (!result.success)
            throw new ValidationError(
                result.error.issues[0].message
            );
        
        return result.data;

    };

};