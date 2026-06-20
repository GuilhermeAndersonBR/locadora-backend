import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

        return jwt.sign(
            payload, 
            this._SECRET,
            {
                expiresIn: "1d"
            }
        );

    };

    public static verify(
        token: string
    ): TokenPayload {

        console.log(token);

        return jwt.verify(
            token, 
            this._SECRET
        ) as TokenPayload;

    };

};