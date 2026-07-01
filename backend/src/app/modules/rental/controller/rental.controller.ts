import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import RentalService from "../service/rental.service.js";
import Transaction from "../../../../core/decorators/transaction.decorator.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import { CreateRentalRequest, CreateRentalRequestSchema } from "@locadora/shared/rental/request/create-rental.request.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";
import UserRole from "@locadora/shared/user/types/user-role.type.js";

@Controller("/rental")
export default class RentalController {

    @Route("/", Method.GET, [
        authGuard,
        roleGuard(UserRole.ADMIN)
    ])
    public async getAll(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await RentalService.getAll();

        return HTTPResponse.ok(
            response,
            "RENTALS_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.GET, [
        authGuard
    ])
    public async getAllById(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await RentalService.getAllById(
            Number(request.params.id)
        );

        return HTTPResponse.ok(
            response,
            "RENTALS_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/", Method.POST, [])
    @BodySchema(CreateRentalRequestSchema)
    @Transaction()
    public async create(
        request: TypedRequest<CreateRentalRequest>, 
        response: Response
    ): Promise<Response> {

        const data = RentalService.create(
            request.body
        );

        return HTTPResponse.ok(
            response,
            "RENTAL_CREATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id/finish", Method.PATCH, [
        authGuard
    ])
    @Transaction()
    public async finish(
        request: Request,
        response: Response
    ) {

        const data =
            await RentalService.finish(
                Number(
                    request.params.id
                )
            );

        return HTTPResponse.ok(
            response,
            "RENTAL_FINISHED_SUCCESSFULLY",
            data
        );

    }

    @Route("/:id/cancel", Method.PATCH, [
        authGuard
    ])
    @Transaction()
    public async cancel(
        request: Request,
        response: Response
    ) {

        const data =
            await RentalService.cancel(
                Number(
                    request.params.id
                )
            );

        return HTTPResponse.ok(
            response,
            "RENTAL_CANCELLED_SUCCESSFULLY",
            data
        );

    }

};