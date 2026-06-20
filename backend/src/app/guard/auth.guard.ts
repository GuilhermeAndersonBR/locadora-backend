import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../core/errors/unauthorized.error.js";
import JWTService from "../../core/security/jwt.service.js";
import { MiddlewareHandler } from "../../core/types/middleware-handler.type.js";

export const authGuard: MiddlewareHandler = async (
    request: Request,
    _response: Response,
    next: NextFunction
): Promise<void> => {

    const authorization = 
        request.headers.authorization;

    if(!authorization)
        throw new UnauthorizedError(
            "TOKEN_NOT_PROVIDED"
        );

    const [ 
        type, 
        token 
    ] = authorization.split(" ");

    if(type !== "Bearer")
        throw new UnauthorizedError(
            "INVALID_TOKEN_TYPE"
        );
    
    const payload = JWTService.verify(token);

    request.user = payload;

    next();

};