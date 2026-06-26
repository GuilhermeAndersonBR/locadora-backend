import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import CreateRentalSchema from "../schema/create-rental.schema.js";
import RentalService from "../service/rental.service.js";
import Transaction from "../../../../core/decorators/transaction.decorator.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";

@Controller("/rental")
export default class RentalController {

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

    @Route("/", Method.POST, [])
    @BodySchema(CreateRentalSchema)
    @Transaction()
    public async create(
        request: TypedRequest<typeof CreateRentalSchema>, 
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

};