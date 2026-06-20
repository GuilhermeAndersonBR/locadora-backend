import { Request, Response } from "express";

import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import Controller from "../../../../core/decorators/controller.decorator.js";
import UserService from "../service/user.service.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { createUserValidator } from "../validator/create-user.validator.js";
import { create } from "node:domain";
import { createUserTransformer } from "../transformer/create-user.transformer.js";
import Status from "../../../../core/enums/status.enum.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";

@Controller("/user")
export default class UserController {

    public constructor(
        private readonly service = new UserService()
    ) {};

    @Route("/all", Method.GET, [
        authGuard,
        roleGuard("ADMIN")
    ])
    public async getAll(
        _request: Request, 
        response: Response
    ): Promise<Response> {

        const users = await this.service.getAll();

        return HTTPResponse.ok(
            response,
            "Usuários obtidos com sucesso", 
            users
        );

    };

    @Route("/create", Method.POST, [
        createUserTransformer,
        createUserValidator
    ])
    public async create(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const { name, cpf, email, password, role } = request.body;

        const user = await this.service.create({
            name, 
            cpf, 
            email, 
            password,
            role
        });

        return HTTPResponse.created(
            response, 
            "Usuário criado com sucesso",
            user
        );

    };

    @Route("/me", Method.GET, [
        authGuard
    ])
    public async me(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const { user } = request;

        if(!user)
            return HTTPResponse.fail(
                response,
                "Usuário não encontrado",
                Status.UNAUTHORIZED
            );

        return HTTPResponse.ok(
            response,
            "USER_FOUND_SUCCESSFULLY",
            user
        );

    };

    @Route("/update/:id", Method.PUT, [
        authGuard
    ])
    public async update(
        request: Request, 
        response: Response
    ): Promise<Response> {

        

        return HTTPResponse.ok(
            
        )

    }

};