import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import UserService from "../service/user.service.js";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import { TypedFileRequest, TypedRequest } from "../../../../core/types/typed-request.type.js";
import Role from "../../../../../../shared/src/user/types/user-role.type.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";
import { uploadMiddleware } from "../../../../core/middleware/upload.middleware.js";
import Transaction from "../../../../core/decorators/transaction.decorator.js";
import { CreateUserRequest, CreateUserRequestSchema } from "@locadora/shared/user/request/create-user.request.js";
import { UpdateUserRequest, UpdateUserRequestSchema } from "@locadora/shared/user/request/update-user.request.js";
import { UpdateUserPasswordRequestSchema, UpdateUserPasswordRequest } from "@locadora/shared/user/request/update-password-request.js";
import { UpdateUserRoleRequest, UpdateUserRoleRequestSchema } from "@locadora/shared/user/request/update-role.request.js";
import { DeleteUserRequest, DeleteUserRequestSchema } from "@locadora/shared/user/request/delete-user.request.js";

@Controller("/user")
export default class UserController {

    @Route("/", Method.GET, [])
    public async getAll(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await UserService.getAll();

        return HTTPResponse.ok(
            response,
            "USERS_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/client", Method.POST, [
        uploadMiddleware("file")
    ])
    @BodySchema(CreateUserRequestSchema)
    @Transaction()
    public async create(
        request: TypedFileRequest<CreateUserRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await UserService.create({
            ...request.body,
            role: Role.CLIENT,
            file: request.file
        });

        return HTTPResponse.ok(
            response,
            "USER_CREATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.GET, [])
    public async getById(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const { id } = request.params;

        const data = await UserService.getById(
            Number(id)
        );

        return HTTPResponse.ok(
            response,
            "USER_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/me", Method.PUT, [
        authGuard
    ])
    @BodySchema(UpdateUserRequestSchema)
    public async update(
        request: TypedRequest<UpdateUserRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await UserService.update(
            request.user!,
            request.body
        );

        return HTTPResponse.ok(
            response,
            "USER_UPDATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/me/password", Method.DELETE, [
        authGuard
    ])
    @BodySchema(UpdateUserPasswordRequestSchema)
    public async updatePassword(
        request: TypedRequest<UpdateUserPasswordRequest>, 
        response: Response
    ): Promise<Response> {

        return HTTPResponse.ok(
            response,
            "PASSWORD_UPDATED_SUCCESSFULLY",
            {}
        );

    };

    @Route("/me/role", Method.PUT, [
        authGuard,
        roleGuard(Role.ADMIN)
    ])
    @BodySchema(UpdateUserRoleRequestSchema)
    public async updateRole(
        request: TypedRequest<UpdateUserRoleRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await UserService.updateRole(
            request.user!,
            request.body
        );

        return HTTPResponse.ok(
            response,
            "ROLE_UPDATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/me/avatar", Method.PUT, [
        authGuard
    ])
    @BodySchema(UpdateUserRequestSchema)
    @Transaction()
    public async updateAvatar(
        request: TypedFileRequest<UpdateUserRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await UserService.updateAvatar(
            request.user!,
            {
                ...request.body,
                file: request.file
            }
        );

        return HTTPResponse.ok(
            response,
            "AVATAR_UPDATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/me", Method.DELETE, [
        authGuard
    ])
    @BodySchema(DeleteUserRequestSchema)
    public async delete(
        request: TypedRequest<DeleteUserRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await UserService.delete(
            request.user!,
            request.body
        );

        return HTTPResponse.ok(
            response,
            "USER_DELETED_SUCCESSFULLY",
            data
        );

    };

};