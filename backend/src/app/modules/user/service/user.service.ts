import CreateUserSchema from "../schema/create-user.schema.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import Role from "../types/role.type.js";
import UserRepository from "../repository/user.repository.js";
import ConflictError from "../../../../core/errors/conflict.error.js";
import PasswordService from "../../../../core/services/password.service.js";
import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TokenPayload } from "../../../../core/services/jwt.service.js";
import UpdateUserSchema from "../schema/update-user.schema.js";
import UpdatePasswordUserSchema from "../schema/update-password-schema.js";
import UpdateUserRoleSchema from "../schema/update-role.schema.js";
import DeleteUserSchema from "../schema/delete-user.schema.js";

export default class UserService {

    public static async getAll(

    ): Promise<Record<string, any>[]> {

        const users = await UserRepository.getAll();

        return users;

    };

    public static async create(
        data: TypedBody<typeof CreateUserSchema> & {
            role: Role
        }
    ): Promise<Record<string, any>> {

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

        return {
            id: userId
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
        data: TypedBody<typeof UpdateUserSchema>
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
        data: TypedBody<typeof UpdatePasswordUserSchema>
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
        data: TypedBody<typeof UpdateUserRoleSchema>
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

    public static async delete(
        requester: TokenPayload,
        data: TypedBody<typeof DeleteUserSchema>
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

        return {};

    };

};