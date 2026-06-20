import { Request, Response, NextFunction } from "express";
import { MiddlewareHandler } from "../../../../core/types/middleware-handler.type.js";
import CreateUserDTO from "../dto/create-user.dto.js";

export const createUserTransformer: MiddlewareHandler = (
    request: Request,
    _response: Response,
    next: NextFunction
) => {

    const { name, cpf, email, password, role } = request.body as CreateUserDTO;

    request.body = {
        name: name.trim(),
        cpf: cpf.trim().replace("\.", "").replace("-", ""),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        role
    };

    next();

};