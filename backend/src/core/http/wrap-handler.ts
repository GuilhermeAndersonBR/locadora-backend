import { Request, Response, NextFunction } from "express";
import { MiddlewareHandler } from "../types/middleware/middleware-handler.type.js";
import { error } from "node:console";
import { transaction } from "../config/transaction.config.js";

export function wrap(fn: Function) {
    
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        
        try {

            const result =
                await transaction(async () => {

                    return await fn(req, res, next);

                });

            return result;
        
        } catch (err) {
            
            next(err);
        
        };
    
    };

};