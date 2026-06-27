import z from "zod";
import { ZodSchema } from "zod/v3";
import { PaymentField } from "../field/payment.field.js";

const CreatePaymentSchema = z.object({

    rental_id: PaymentField.rental_id,

    payment_method: PaymentField.payment_method,

});

type CreatePaymentSchema = ZodSchema<
    z.infer<
        typeof CreatePaymentSchema
    >
>;

export default CreatePaymentSchema;