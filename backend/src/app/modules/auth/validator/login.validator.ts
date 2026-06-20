import { Request, Response, NextFunction } from "express";
import ValidationError from "../../../../core/errors/validation.error.js";
import { MiddlewareHandler } from "../../../../core/types/middleware-handler.type.js";
import { LoginDTO } from "../dto/login.dto.js";

export const loginValidator: MiddlewareHandler = (
    request: Request, _response: Response, next: NextFunction    
): void => {
        
    const { email, password } = request.body as LoginDTO;

    if(!email.trim())
        throw new ValidationError(
            "EMAIL_IS_REQUIRED"
        );

    if(!password.trim())
        throw new ValidationError(
            "PASSWORD_IS_REQUIRED"
        );

    next();
    
};