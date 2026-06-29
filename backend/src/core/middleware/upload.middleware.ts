import { Request, Response, NextFunction } from "express";
import { MiddlewareHandler } from "../types/middleware/middleware-handler.type.js";
import multer from "multer";
import Log from "../messages/log.js";

export function uploadMiddleware(
    field: string
): MiddlewareHandler {

    Log.info(
        "Creating upload middleware for field: {0}",
        field
    );

    return multer({
        storage: multer.memoryStorage()
    }).single(field);

};