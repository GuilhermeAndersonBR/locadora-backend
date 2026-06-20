import Status from "../enums/status.enum.js";
import { AppError } from "./app-error.js";

export default class UnauthorizedError extends AppError {
    
    public constructor(
        code?: string
    ) {
        
        super(
            Status.UNAUTHORIZED, 
            code
        );
    
    };

};