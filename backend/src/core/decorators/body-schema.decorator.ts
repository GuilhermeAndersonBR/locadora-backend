import { Request, Response, NextFunction } from "express";
import z from "zod";
import Validator from "../validator/validator.js";

export function BodySchema(schema: z.ZodTypeAny) {
    
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {

        const originalMethod = descriptor.value;

        descriptor.value = async function(
            request: Request,
            response: Response,
            next: NextFunction
        ) {

            try {

                request.body =
                    Validator.validate(
                        schema,
                        request.body
                    );

                return originalMethod.call(
                    this,
                    request,
                    response,
                    next
                );

            } catch (err) {

                next(err);

            };

        };

        return descriptor;

    };

};