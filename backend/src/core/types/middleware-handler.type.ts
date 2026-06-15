import { Request, Response, NextFunction } from "express";

export type MiddlewareHandler = (
    request: Request, 
    response: Response, 
    next: NextFunction
) => void | Promise<void>;