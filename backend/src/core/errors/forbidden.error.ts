import Status from "../enums/status.enum.js";
import { AppError } from "./app-error.js";

export default class ForbiddenError extends AppError {

    public constructor(
        code?: string
    ) {
        
        super(
            Status.FORBIDDEN, 
            code
        );
        
    };

};