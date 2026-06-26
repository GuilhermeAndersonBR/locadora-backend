import z from "zod";
import { ZodSchema } from "zod/v3";
import { RentalField } from "../field/rental.field.js";

const CreateRentalSchema = z.object({

    user_id: RentalField.user_id,

    vehicle_id: RentalField.vehicle_id,

    start_date: RentalField.start_date,

    expected_return_date: RentalField.expected_return_date,

});

type CreateRentalSchema = ZodSchema<
    z.infer<
        typeof CreateRentalSchema
    >
>;

export default CreateRentalSchema;