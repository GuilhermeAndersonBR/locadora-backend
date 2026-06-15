import { Request, Response, NextFunction } from "express";
import { MiddlewareHandler } from "../types/middleware-handler.type.js";
import { error } from "node:console";

export function wrap(fn: Function) {
    
    return (req: Request, res: Response, next: NextFunction) => {
        
        try {

            const result = fn(req, res, next);

            if (result instanceof Promise) 
                result.catch(next);
        
        } catch (err) {
            
            next(err);
        
        };
    
    };

};