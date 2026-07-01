import { Request, Response } from "express";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Transaction from "../../../../core/decorators/transaction.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import PaymentService from "../service/payment.service.js";

import { CreatePaymentRequest, CreatePaymentRequestSchema } from "@locadora/shared/payment/request/create-payment.request.js";
import { authGuard } from "../../../guard/auth.guard.js";
import UserRole from "@locadora/shared/user/types/user-role.type.js";
import roleGuard from "../../../guard/role.guard.js";

@Controller("/payment")
export default class PaymentController {

    @Route("/", Method.GET, [
        authGuard,
        roleGuard(UserRole.ADMIN)
    ])
    public async getAll(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await PaymentService.getAll();

        return HTTPResponse.ok(
            response,
            "PAYMENTS_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.GET, [
        authGuard,
    ])
    public async getAllByUserId(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await PaymentService.getAllByUserId(
            Number(request.params.id)
        );

        return HTTPResponse.ok(
            response,
            "PAYMENTS_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/pay", Method.PATCH, [])
    @BodySchema(CreatePaymentRequestSchema)
    @Transaction()
    public async pay(
        request: TypedRequest<CreatePaymentRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await PaymentService.pay(
            request.body
        );

        return HTTPResponse.ok(
            response,
            "PAYMENT_CREATED_SUCCESSFULLY",
            data
        );

    };

};