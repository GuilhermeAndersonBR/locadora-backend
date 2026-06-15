import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
import HTTPResponse from "../http/httpResponse.js";
import Status from "../enums/status.enum.js";

export function errorHandler(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): Response {

    if (error instanceof AppError) return HTTPResponse.fail(
        response, 
        error.message, 
        error.statusCode as Status, 
        error.code
    );

    console.error(error);

    return HTTPResponse.fail(
        response, 
        "Internal server error", 
        Status.INTERNAL_SERVER_ERROR,
        "INTERNAL_SERVER_ERROR"
    );

};