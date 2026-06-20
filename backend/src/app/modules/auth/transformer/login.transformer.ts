import { Request, Response, NextFunction } from "express";
import { MiddlewareHandler } from "../../../../core/types/middleware-handler.type.js";
import { LoginDTO } from "../dto/login.dto.js";

export const loginTransformer: MiddlewareHandler = (
    request: Request,
    _response: Response,
    next: NextFunction
) => {

    const { email, password } = request.body as LoginDTO;

    request.body = {
        email: email.trim().toLowerCase(),
        password: password.trim()
    };

    next();

};