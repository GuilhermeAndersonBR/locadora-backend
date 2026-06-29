import Status from "../enums/status.enum.js";
import { AppError } from "./app-error.js";

export default class InvalidError extends AppError {
    
    public constructor(
        code?: string
    ) {
        
        super(
            Status.BAD_REQUEST, 
            code
        );
    
    };

};