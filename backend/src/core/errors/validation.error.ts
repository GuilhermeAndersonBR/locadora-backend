import Status from "../enums/status.enum.js";
import { AppError } from "./app-error.js";

export default class ValidationError extends AppError {
    
    public constructor(
        message: string,
        code?: string
    ) {
        
        super(
            message, 
            Status.BAD_REQUEST, 
            code
        );
    
    };

};