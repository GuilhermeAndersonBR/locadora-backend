import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import BaseController from "../../../../core/http/base.controller.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import AuthService from "../service/auth.service.js";

@Controller
export default class AuthController extends BaseController {

    protected static override readonly __name__: Readonly<string> = "auth";

    public constructor(
        private service = new AuthService()
    ) { super() };

    @Route("/login", Method.POST, [])
    public async login(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const { email, password } = request.body;

        const token = await this.service.login({
            email,
            password
        });

        return HTTPResponse.ok(
            response,
            "Login efetuado com sucesso",
            { token }
        );

    };

};