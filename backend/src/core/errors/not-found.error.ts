import Status from "../enums/status.enum.js";
import { AppError } from "./app-error.js";

export default class NotFoundError extends AppError {
    
    public constructor(
        code?: string
    ) {
        
        super(
            Status.NOT_FOUND, 
            code
        );
    
    };

};