import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import BaseController from "../../../../core/http/base.controller.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import Status from "../../../../core/enums/status.enum.js";

@Controller
export default class VehicleController extends BaseController {

    protected static override readonly __name__: Readonly<string> = "vehicle";

    @Route("/health", Method.GET, [])
    public async health(request: Request, response: Response): Promise<Response> {

        return HTTPResponse.ok(
            response,
            { message: "ok" },
            Status.OK 
        );

    };

};