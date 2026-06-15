import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../core/errors/unauthorized.error.js";
import JWTService from "../../core/security/jwt.service.js";

export default async function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {

    const authorization = request.headers.authorization;

    if(!authorization)
        throw new UnauthorizedError(
            "Token não provido",
            "TOKEN_NOT_PROVIDED"
        );

    const [ type, token ] = authorization.split(" ");

    if(type !== "Bearer")
        throw new UnauthorizedError(
            "Tipo inválido de Token",
            "INVALID_TOKEN_TYPE"
        );
    
    const payload = JWTService.verify(token);

    request.user = payload;
    
    next();

};