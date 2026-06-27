import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import RentalRepository from "../../rental/repository/rental.repository.js";
import PaymentRepository from "../repository/payment.repository.js";
import CreatePaymentSchema from "../schema/create-payment.schema.js";
import PaymentStatus from "../types/payment-status.type.js";

export default abstract class PaymentService {

    public static async pay(
        data: TypedBody<typeof CreatePaymentSchema>
    ): Promise<Record<string, any>> {

        const rental = await RentalRepository.findById(
            data.rental_id
        );

        if(!rental)
            throw new NotFoundError(
                "RENTAL_NOT_FOUND"
            );
        
        const paymentId = await PaymentRepository.create({
            ...data,
            amount: rental.total_price_cents,
            status: PaymentStatus.PENDING
        });

        await PaymentRepository.markAsPaid(
            paymentId
        );

        return {};

    };

};