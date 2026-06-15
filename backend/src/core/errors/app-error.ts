export class AppError extends Error {
    
    public constructor(
        public override message: string,
        public statusCode = 400,
        public code = "APP_ERROR"
    ) {
        
        super(message);
    
    };

};