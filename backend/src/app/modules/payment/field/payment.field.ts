import { z } from "zod";

export const PaymentField = {

    amount: z
        .number({
            error: "AMOUNT_REQUIRED"
        })
        .int({
            error: "AMOUNT_MUST_BE_INTEGER"
        })
        .positive({
            error: "AMOUNT_MUST_BE_POSITIVE"
        })
        .min(1, "AMOUNT_TOO_LOW"),

    payment_method: z
        .enum([
            "CASH",
            "CREDIT_CARD",
            "DEBIT_CARD",
            "PIX"
        ], {
            error: "PAYMENT_METHOD_REQUIRED"
        }),
    
    status: z
        .enum([
            "PENDING",
            "PAID",
            "FAILED",
            "REFUNDED"
        ], {
            error: "STATUS_REQUIRED"
        }),
    
    rental_id: z
        .number({
            error: "RENTAL_ID_REQUIRED"
        })
        .int({
            error: "RENTAL_ID_MUST_BE_INTEGER"
        })
        .positive({
            error: "RENTAL_ID_MUST_BE_POSITIVE"
        }),
    
    payment_date: z
        .date({
            error: "PAYMENT_DATE_REQUIRED"
        })
        .optional()

};