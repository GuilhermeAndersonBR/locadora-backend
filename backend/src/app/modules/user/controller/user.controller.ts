import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import UserService from "../service/user.service.js";
import CreateUserSchema from "../schema/create-user.schema.js";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import Role from "../types/role.type.js";
import UpdateUserSchema from "../schema/update-user.schema.js";
import { authGuard } from "../../../guard/auth.guard.js";
import UpdatePasswordUserSchema from "../schema/update-password-schema.js";
import UpdateUserRoleSchema from "../schema/update-role.schema.js";
import roleGuard from "../../../guard/role.guard.js";
import DeleteUserSchema from "../schema/delete-user.schema.js";

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

    @Route("/client", Method.POST, [])
    @BodySchema(CreateUserSchema)
    public async create(
        request: TypedRequest<typeof CreateUserSchema>, 
        response: Response
    ): Promise<Response> {

        const data = await UserService.create({
            ...request.body,
            role: Role.CLIENT
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
    @BodySchema(UpdateUserSchema)
    public async update(
        request: TypedRequest<typeof UpdateUserSchema>, 
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
    @BodySchema(UpdatePasswordUserSchema)
    public async updatePassword(
        request: TypedRequest<typeof UpdatePasswordUserSchema>, 
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
    @BodySchema(UpdateUserRoleSchema)
    public async updateRole(
        request: TypedRequest<typeof UpdateUserRoleSchema>, 
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

    @Route("/me", Method.DELETE, [
        authGuard
    ])
    @BodySchema(DeleteUserSchema)
    public async delete(
        request: TypedRequest<typeof DeleteUserSchema>, 
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