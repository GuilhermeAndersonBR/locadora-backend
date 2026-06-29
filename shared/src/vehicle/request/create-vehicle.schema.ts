import z from "zod";
import { VehicleInput } from "../input/vehicle.input.js";

export const CreateVehicleRequestSchema = z.object({

    plate: VehicleInput.plate,

    brand: VehicleInput.brand,

    model: VehicleInput.model,

    year: VehicleInput.year,

    daily_rate: VehicleInput.daily_rate,

    status: VehicleInput.status,

    category_id: VehicleInput.category_id

});

export type CreateVehicleRequest = z.infer<
    typeof CreateVehicleRequestSchema
>;