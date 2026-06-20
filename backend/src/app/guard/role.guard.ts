import { Request, Response, NextFunction } from "express";
import NotFoundError from "../../core/errors/not-found.error.js";
import UnauthorizedError from "../../core/errors/unauthorized.error.js";
import { MiddlewareHandler } from "../../core/types/middleware-handler.type.js";

export default function roleGuard(
    role: string
): MiddlewareHandler {

    return (
        request: Request,
        _response: Response,
        next: NextFunction
    ): void => {

        const { user } = request;

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );
        
        if(user.role !== role)
            throw new UnauthorizedError(
                "USER_NOT_AUTHORIZED"
            );
        
        next();

    };

};