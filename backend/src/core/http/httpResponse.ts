import { Response } from "express";
import Status from "../enums/status.enum.js";

type Data = unknown | null; 

export default abstract class HTTPResponse {
    
    private static response<T extends Data>(
        response: Response,
        messageKey: string,
        data: T,
        status: Status,
        success: boolean
    ): Response {

        return response.status(status).json({
            success,
            message: messageKey,
            data
        });

    };

    public static ok<T extends Data>(
        response: Response, 
        message: string,
        data: T
    ): Response {
        
        return this.response<T>(
            response,
            message,
            data,
            Status.OK,
            true
        );
    
    };

    public static created<T extends Data>(
        response: Response, 
        message: string,
        data: T
    ): Response {
        
        return this.response<T>(
            response,
            message,
            data,
            Status.CREATED,
            true
        );
    
    };

    public static fail(
        response: Response,
        message: string,
        status: Status = Status.BAD_REQUEST,
    ): Response {

        return this.response(
            response,
            message,
            null,
            status,
            false
        );
    
    };

};