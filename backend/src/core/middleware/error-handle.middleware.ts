import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
import HTTPResponse from "../http/httpResponse.js";
import Status from "../enums/status.enum.js";
import Log from "../messages/log.js";
import logMessage from "../../../data/logMessage.json" with { type: "json"}; 

export function errorHandler(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): Response {

    if (error instanceof AppError) return HTTPResponse.fail(
        response, 
        error.message, 
        error.statusCode as Status
    );

    Log.error(
        logMessage.CRITICAL_ERROR,
        error
    );

    console.error(error);

    return HTTPResponse.fail(
        response, 
        "INTERNAL_SERVER_ERROR", 
        Status.INTERNAL_SERVER_ERROR
    );

};