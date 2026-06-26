import NotFoundError from "../../../../core/errors/not-found.error.js";
import UnauthorizedError from "../../../../core/errors/unauthorized.error.js";
import JWTService from "../../../../core/services/jwt.service.js";
import PasswordService from "../../../../core/services/password.service.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import UserRepository from "../../user/repository/user.repository.js";
import LoginSchema from "../schema/login.schema.js";

export default class AuthService {

    public static async login(
        data: TypedBody<typeof LoginSchema>
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getByEmail(
            data.email
        );

        if(!user)
            throw new NotFoundError("USER_NOT_FOUND");

        if(!await PasswordService.verify(
            data.password,
            user.password_hash
        ))
            throw new UnauthorizedError(
                "INVALID_PASSWORD"
            );

        const token = JWTService.sign({
            id: user.id,
            role: user.role
        });

        return {
            token
        };

    };

};
