import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import { TypedFileRequest, TypedRequest } from "../../../../core/types/typed-request.type.js";
import AuthService from "../service/auth.service.js";
import Transaction from "../../../../core/decorators/transaction.decorator.js";
import { uploadMiddleware } from "../../../../core/middleware/upload.middleware.js";

import { LoginRequest, LoginRequestSchema } from "@locadora/shared/auth/request/login.request.js";
import { RegisterRequest, RegisterRequestSchema } from "@locadora/shared/auth/request/register.request.js";

@Controller("/auth")
export default class AuthController {

    @Route("/login", Method.POST, [])
    @BodySchema(LoginRequestSchema)
    public async login(
        request: TypedRequest<LoginRequest>, 
        response: Response
    ): Promise<Response> {

        const token = await AuthService.login(
            request.body
        );

        return HTTPResponse.ok(
            response,
            "LOGIN_SUCCESSFULLY",
            token
        );

    };

    @Route("/register", Method.POST, [
        uploadMiddleware("file")
    ])
    @BodySchema(RegisterRequestSchema)
    @Transaction()
    public async register(
        request: TypedFileRequest<RegisterRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await AuthService.register({
            ...request.body,
            file: request.file
        });

        return HTTPResponse.ok(
            response,
            "REGISTER_SUCCESSFULLY",
            data
        );

    };

};