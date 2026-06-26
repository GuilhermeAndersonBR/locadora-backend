import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UnauthorizedError from "../errors/unauthorized.error.js";

dotenv.config();
export interface TokenPayload {
    id: number,
    role: string
};

export default abstract class JWTService {

    private static readonly _SECRET: string = 
        process.env.JWT_SECRET!;

    public static sign(
        payload: TokenPayload
    ): string {

        try {

            return jwt.sign(
                payload, 
                this._SECRET,
                {
                    expiresIn: "1d"
                }
            );

        } catch (error) {
            
            throw new UnauthorizedError(
                "INVALID_TOKEN"
            );
        
        };

    };

    public static verify(
        token: string
    ): TokenPayload {

        try {
            
            return jwt.verify(
                token, 
                this._SECRET
            ) as TokenPayload;
        
        } catch (error) {
            
            throw new UnauthorizedError(
                "INVALID_TOKEN"
            );
        
        };

    };

};