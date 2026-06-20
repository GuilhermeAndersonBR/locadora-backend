export class AppError extends Error {
    
    public constructor(
        public statusCode = 400,
        public code = "APP_ERROR"
    ) {
        
        super(code);
    
    };

};