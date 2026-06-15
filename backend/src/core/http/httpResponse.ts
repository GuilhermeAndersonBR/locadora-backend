import { Response } from "express";
import Status from "../enums/status.enum.js";
import { QueryResult } from "mysql2";

type Data = Record<string, unknown> | QueryResult; 

export default abstract class HTTPResponse {
    
    public static ok<T extends Data>(
        response: Response, 
        message: string,
        data: T, 
        status: Status = Status.OK
    ): Response {
        
        return response.status(status).json({
            success: true,
            message,
            data,
            error: null
        });
    
    };

    public static created<T extends Data>(
        response: Response, 
        message: string,
        data: T
    ): Response {
        
        return response.status(Status.CREATED).json({
            success: true,
            message,
            data,
            error: null
        });
    
    };

    public static fail(
        response: Response,
        message: string,
        status: Status = Status.BAD_REQUEST,
        code: string
    ): Response {

        return response.status(status).json({
            success: false,
            message,
            code
        });
    
    };

};