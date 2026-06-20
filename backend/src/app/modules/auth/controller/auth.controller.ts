import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import AuthService from "../service/auth.service.js";
import { loginTransformer } from "../transformer/login.transformer.js";
import { loginValidator } from "../validator/login.validator.js";

@Controller("/auth")
export default class AuthController {

    public constructor(
        private service = new AuthService()
    ) {};

    @Route("/login", Method.POST, [
        loginTransformer,
        loginValidator
    ])
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
            "LOGIN_SUCCESSFULLY",
            { token }
        );

    };

};