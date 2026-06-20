import { Request, Response, NextFunction } from "express";
import ValidationError from "../../../../core/errors/validation.error.js";
import EmailValidator from "../../../../core/validators/email.validator.js";
import { MiddlewareHandler } from "../../../../core/types/middleware-handler.type.js";

export const createUserValidator: MiddlewareHandler = (
    request: Request, _response: Response, next: NextFunction    
) => {

    const { name, cpf, email, password, role } = request.body;

    if(!name.trim()) 
        throw new ValidationError(
            "NAME_IS_REQUIRED"
        );

    if(!cpf.trim()) 
        throw new ValidationError(
            "CPF_IS_REQUIRED"
        );

    if(!email.trim()) 
        throw new ValidationError(
            "EMAIL_IS_REQUIRED"
        );

    if(!EmailValidator.validate(email))
        throw new ValidationError(
            "INVALID_EMAIL"
        );

    if(!password.trim()) 
        throw new ValidationError(
            "PASSWORD_IS_REQUIRED"
        );

    if(cpf.length !== 11)
        throw new ValidationError(
            "INVALID_CPF"
        );

    if(password.length < 8)
        throw new ValidationError(
            "INVALID_PASSWORD"
        );
    
    if(!role.trim()) 
        throw new ValidationError(
            "ROLE_IS_REQUIRED"
        );

    next();

};