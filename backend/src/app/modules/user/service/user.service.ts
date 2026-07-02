import { TypedBody, TypedFileBody } from "../../../../core/types/typed-body.type.js";
import UserRepository from "../repository/user.repository.js";
import ConflictError from "../../../../core/errors/conflict.error.js";
import PasswordService from "../../../../core/services/password.service.js";
import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TokenPayload } from "../../../../core/services/jwt.service.js";
import ImageService from "../../image/service/image.service.js";
import ImageProcessor from "../../../../core/services/image/image-processor.service.js";
import URLService from "../../../../core/services/url.service.js";
import { CreateUserRequest } from "@locadora/shared/user/request/create-user.request.js";
import { CreateUserResponse } from "@locadora/shared/user/response/create-user.res.js";
import ImageEntityType from "@locadora/shared/image/types/image-entity.type.js";
import { UpdateUserRequest } from "@locadora/shared/user/request/update-user.request.js";
import { UpdateUserPasswordRequest } from "@locadora/shared/user/request/update-password-request.js";
import { UpdateUserRoleRequest } from "@locadora/shared/user/request/update-role.request.js";
import { DeleteUserRequest } from "@locadora/shared/user/request/delete-user.request.js";
import UserRole from "@locadora/shared/user/types/user-role.type.js";

export default class UserService {

    public static async getAll(

    ): Promise<Record<string, any>[]> {

        const users = await UserRepository.getAll();

        return users;

    };

    public static async create(
        data: TypedFileBody<CreateUserRequest> & {
            role: UserRole
        }
    ): Promise<CreateUserResponse> {

        const userGetByEmail = await UserRepository.getByEmail(
            data.email
        );

        if(userGetByEmail)
            throw new ConflictError("EMAIL_ALREADY_EXISTS");

        const userGetByCPF = await UserRepository.getByCPF(
            data.cpf
        );

        if(userGetByCPF)
            throw new ConflictError("CPF_ALREADY_EXISTS");

        const password_hash = await PasswordService.hash(
            data.password
        );

        const userId = await UserRepository.create({
            ...data,
            password: password_hash
        });

        const images = await ImageService.upload({
            entity_id: userId,
            entity_type: ImageEntityType.USER,
            file: data.file,
            processors: [
                {
                    name: "avatar",
                    processor: ImageProcessor.thumbnail
                }
            ]
        });

        return {
            id: userId,
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            role: data.role,
            images: images.map(
                (image) => ({
                    variant: image.variant,
                    url: URLService.url(image.storage_key)
                })
            )
        };

    };

    public static async getById(
        id: number
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getById(
            id
        );

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

    };

    public static async update(
        requester: TokenPayload,
        data: TypedBody<UpdateUserRequest>
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getById(
            requester.id
        );

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );

        if(data.email && await UserRepository.getByEmail(
            data.email
        ))
            throw new ConflictError(
                "EMAIL_ALREADY_EXISTS"
            );

        if(data.cpf && await UserRepository.getByCPF(
            data.cpf
        ))
            throw new ConflictError(
                "CPF_ALREADY_EXISTS"
            );
        
        if(await PasswordService.verify(
            data.password,
            user.password_hash
        ))
            throw new ConflictError(
                "INVALID_PASSWORD"
            );

        await UserRepository.update({
            ...data,
            id: requester.id
        });

        return {};

    };

    public static async updatePassword(
        requester: TokenPayload,
        data: TypedBody<UpdateUserPasswordRequest>
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getById(
            requester.id
        );

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );
        
        if(await PasswordService.verify(
            data.currentPassword,
            user.password_hash
        ))
            throw new ConflictError(
                "INVALID_PASSWORD"
            );

        const password_hash = await PasswordService.hash(
            data.newPassword
        );

        await UserRepository.updatePassword({
            ...data,
            id: requester.id,
            newPassword: password_hash
        });

        return {};

    };

    public static async updateRole(
        requester: TokenPayload,
        data: TypedBody<UpdateUserRoleRequest>
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getById(
            requester.id
        );

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );
        
        if(await PasswordService.verify(
            data.password,
            user.password_hash
        ))
            throw new ConflictError(
                "INVALID_PASSWORD"
            );        

        await UserRepository.updateRole({
            ...data,
            id: requester.id
        });

        return {};

    };

    public static async updateAvatar(
        requester: TokenPayload,
        data: TypedFileBody<{}>
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getById(
            requester.id
        );

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );

        await ImageService.upload({
            entity_id: user.id,
            entity_type: ImageEntityType.USER,
            file: data.file,
            processors: [
                {
                    name: "avatar",
                    processor: ImageProcessor.thumbnail
                }
            ]
        });

        return {};

    };

    public static async delete(
        requester: TokenPayload,
        data: TypedBody<DeleteUserRequest>
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getById(
            requester.id
        );

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );
        
        if(await PasswordService.verify(
            data.password,
            user.password_hash
        ))
            throw new ConflictError(
                "INVALID_PASSWORD"
            );

        await UserRepository.delete({
            ...data,
            id: requester.id
        });

        await ImageService.delete({
            entity_id: user.id,
            entity_type: ImageEntityType.USER
        });

        return {};

    };

};