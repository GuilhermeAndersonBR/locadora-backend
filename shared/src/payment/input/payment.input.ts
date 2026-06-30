import { z } from "zod";
import PaymentMethod from "../types/payment-method.type.js";
import PaymentStatus from "../types/payment-status.type.js";

export const PaymentInput = {

    amount: z
        .coerce
        .number({
            required_error: "AMOUNT_REQUIRED"
        })
        .int("AMOUNT_MUST_BE_INTEGER")
        .positive("AMOUNT_MUST_BE_POSITIVE")
        .min(1, "AMOUNT_TOO_LOW"),

    payment_method: z
        .enum([
            PaymentMethod.CREDIT_CARD,
            PaymentMethod.DEBIT_CARD,
            PaymentMethod.PIX,
            PaymentMethod.CASH
        ], {
            required_error: "PAYMENT_METHOD_REQUIRED"
        }),
    
    status: z
        .enum([
            PaymentStatus.PENDING,
            PaymentStatus.PAID,
            PaymentStatus.FAILED,
            PaymentStatus.REFUNDED
        ], {
            required_error: "STATUS_REQUIRED"
        }),
    
    rental_id: z
        .coerce
        .number({
            required_error: "RENTAL_ID_REQUIRED"
        })
        .int("RENTAL_ID_MUST_BE_INTEGER")
        .positive("RENTAL_ID_MUST_BE_POSITIVE"),
    
    payment_date: z
        .date({
            required_error: "PAYMENT_DATE_REQUIRED"
        })
        .optional()

};