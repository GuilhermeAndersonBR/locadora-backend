import { Request, Response, NextFunction } from "express";
import { MiddlewareHandler } from "../types/middleware/middleware-handler.type.js";

export const languageMiddleware: MiddlewareHandler = (
    request: Request,
    _response: Response,
    next: NextFunction
): void => {

    request.language = request.headers["accept-language"] 
    ?? "en-US";

    next();

};