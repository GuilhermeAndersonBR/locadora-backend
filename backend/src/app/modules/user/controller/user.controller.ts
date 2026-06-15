import { Request, Response } from "express";

import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import Controller from "../../../../core/decorators/controller.decorator.js";
import UserService from "../service/user.service.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import BaseController from "../../../../core/http/base.controller.js";
import { AppError } from "../../../../core/errors/app-error.js";
import Status from "../../../../core/enums/status.enum.js";
import { cp } from "node:fs";

@Controller
export default class UserController extends BaseController {

    protected static override readonly __name__: Readonly<string> = "user";

    public constructor(
        private service = new UserService()
    ) { super() };

    @Route("/getAll", Method.GET, [])
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

    @Route("/create", Method.POST, [])
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

};