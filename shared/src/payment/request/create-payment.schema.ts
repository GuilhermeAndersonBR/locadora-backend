import z from "zod";
import { PaymentInput } from "../input/payment.input.js";

export const CreatePaymentRequestSchema = z.object({

    rental_id: PaymentInput.rental_id,

    payment_method: PaymentInput.payment_method,

});

export type CreatePaymentRequest = z.infer<
    typeof CreatePaymentRequestSchema
>;