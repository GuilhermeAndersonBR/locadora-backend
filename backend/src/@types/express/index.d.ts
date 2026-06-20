import "express";

declare global {

    namespace Express {

        interface Request {

            language: string;

            user?: {

                id: number;
                role: string;

            };

        };

    };

};

export {};