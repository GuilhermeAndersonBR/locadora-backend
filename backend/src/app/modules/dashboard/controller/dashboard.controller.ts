import { Request, Response } from "express";
import UserRole from "@locadora/shared/user/types/user-role.type.js";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";
import DashboardService from "../service/dashboard.service.js";

@Controller("/dashboard")
export default class DashboardController {

    @Route("/", Method.GET, [
        authGuard,
        roleGuard(UserRole.ADMIN)
    ])
    public async dashboard(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await DashboardService.dashboard();

        return HTTPResponse.ok(
            response,
            "DASHBOARD_FOUND_SUCCESSFULLY",
            data
        );

    };

};