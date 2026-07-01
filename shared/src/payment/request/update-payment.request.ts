import z from "zod";
import { PaymentInput } from "../input/payment.input.js";

const UpdatePaymentRequestSchema = z.object({

    status: PaymentInput.status,

    payment_date: PaymentInput.payment_date

});

export type UpdatePaymentRequest = z.infer<
    typeof UpdatePaymentRequestSchema
>;