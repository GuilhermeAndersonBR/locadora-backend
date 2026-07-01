import z from "zod";
import { PaymentInput } from "../input/payment.input.js";
import PaymentStatus from "../types/payment-status.type.js";
import PaymentMethod from "../types/payment-method.type.js";
import { GetVehicleResponseSchema } from "../../vehicle/response/get-vehicle.response.js";

export const GetAllPaymentResponseSchema = z.array(z.object({

    id: z.number(),

    amount: z.number(),

    payment_method: z.enum([
        PaymentMethod.CASH,
        PaymentMethod.CREDIT_CARD,
        PaymentMethod.DEBIT_CARD,
        PaymentMethod.PIX
    ]),

    status: z.enum([
        PaymentStatus.FAILED,
        PaymentStatus.PENDING,
        PaymentStatus.PAID,
        PaymentStatus.REFUNDED
    ]),

    payment_date: z.string().optional(),

    rental_id: z.number(),

    created_at: z.string(),

    vehicle: GetVehicleResponseSchema,

    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string()
    })
    
}));

export type GetAllPaymentResponse = z.infer<
    typeof GetAllPaymentResponseSchema
>;