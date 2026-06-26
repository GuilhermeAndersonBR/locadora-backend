import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";

@Controller("/{{route}}")
export class {{Entity}}Controller {

    @Route("/health", Method.GET, [])
    public async health(
        request: Request, 
        response: Response
    ): Promise<Response> {

        return HTTPResponse.ok(
            response,
            "HEALTH_CHECK_SUCCESSFULLY",
            {}
        );

    };

};