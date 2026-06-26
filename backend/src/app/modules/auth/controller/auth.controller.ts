import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import LoginSchema from "../schema/login.schema.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import AuthService from "../service/auth.service.js";

@Controller("/auth")
export default class AuthController {

    @Route("/login", Method.POST, [])
    @BodySchema(LoginSchema)
    public async login(
        request: TypedRequest<typeof LoginSchema>, 
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

};