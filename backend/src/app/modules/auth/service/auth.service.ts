import UserRole from "@locadora/shared/user/types/user-role.type.js";
import NotFoundError from "../../../../core/errors/not-found.error.js";
import UnauthorizedError from "../../../../core/errors/unauthorized.error.js";
import JWTService from "../../../../core/services/jwt.service.js";
import PasswordService from "../../../../core/services/password.service.js";
import { TypedBody, TypedFileBody } from "../../../../core/types/typed-body.type.js";
import UserRepository from "../../user/repository/user.repository.js";
import UserService from "../../user/service/user.service.js";

import { LoginRequest } from "@locadora/shared/auth/request/login.request.js";
import { RegisterRequest } from "@locadora/shared/auth/request/register.request.js";
import { LoginResponse } from "@locadora/shared/auth/response/login.response.js";
import { RegisterResponse } from "@locadora/shared/auth/response/register.response.js";
import ImageService from "../../image/service/image.service.js";
import ImageEntityType from "@locadora/shared/image/types/image-entity.type.js";
import URLService from "../../../../core/services/url.service.js";

export default class AuthService {

    public static async login(
        data: TypedBody<LoginRequest>
    ): Promise<LoginResponse> {

        try {

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

            const images = await ImageService.find({
                entity_type: ImageEntityType.USER,
                entity_id: user.id
            });

            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    cpf: user.cpf,
                    role: user.role,
                    images: images.map(image => ({
                        variant: image.variant,
                        url: URLService.url(image.storage_key)
                    }))
                }
            };

        } catch(error) {
            
            throw new UnauthorizedError(
                "INVALID_CREDENTIALS"
            );

        };

    };

    public static async register(
        data: TypedFileBody<RegisterRequest>
    ): Promise<RegisterResponse> {

        const user = await UserService.create({
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            password: data.password,
            role: UserRole.CLIENT,
            file: data.file
        });

        const { token } = await this.login({
            email: data.email,
            password: data.password
        });

        return {
            token,
            user
        };

    };

};
