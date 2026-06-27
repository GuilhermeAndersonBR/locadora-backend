import { Request, Response } from "express";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Transaction from "../../../../core/decorators/transaction.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import CreatePaymentSchema from "../schema/create-payment.schema.js";
import PaymentService from "../service/payment.service.js";

@Controller("/payment")
export default class PaymentController {

    @Route("/pay", Method.POST, [])
    @BodySchema(CreatePaymentSchema)
    @Transaction()
    public async pay(
        request: TypedRequest<typeof CreatePaymentSchema>, 
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