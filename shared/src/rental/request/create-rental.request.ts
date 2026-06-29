import z from "zod";
import { RentalInput } from "../input/rental.input.js";

export const CreateRentalRequestSchema = z.object({

    user_id: RentalInput.user_id,

    vehicle_id: RentalInput.vehicle_id,

    start_date: RentalInput.start_date,

    expected_return_date: RentalInput.expected_return_date,

});

export type CreateRentalRequest = z.infer<
    typeof CreateRentalRequestSchema
>;