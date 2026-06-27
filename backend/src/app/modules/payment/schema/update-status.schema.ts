import z from "zod";
import { ZodSchema } from "zod/v3";
import { PaymentField } from "../field/payment.field.js";

const UpdatePaymentSchema = z.object({

    status: PaymentField.status,

    payment_date: PaymentField.payment_date

});

type UpdatePaymentSchema = ZodSchema<
    z.infer<
        typeof UpdatePaymentSchema
    >
>;

export default UpdatePaymentSchema;