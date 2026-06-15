import argon2 from "argon2";
import dotenv from "dotenv";

dotenv.config();

export default abstract class PasswordService {

    private static readonly _PASSWORD_PEPPER = process.env.PASSWORD_PEPPER!;
    
    public static async hash(password: string): Promise<string> {

        password = password + this._PASSWORD_PEPPER;

        const argon2_password_hash = await argon2.hash(
            password, 
            {
                type: argon2.argon2id,
                hashLength: 64,
                timeCost: 5,
                memoryCost: 65536,
                parallelism: 4
            }
        );

        return argon2_password_hash;

    };

    public static async verify(
        password: string, hash: string
    ): Promise<boolean> {
        
        password = password + this._PASSWORD_PEPPER;

        return argon2.verify(hash, password);

    };

};