import z from "zod";
import { VehicleInput } from "../input/vehicle.input.js";

export const UpdateVehicleRequestSchema = z.object({

    plate: VehicleInput.plate.optional(),

    brand: VehicleInput.brand.optional(),

    model: VehicleInput.model.optional(),

    year: VehicleInput.year.optional(),

    daily_rate: VehicleInput.daily_rate.optional(),

    status: VehicleInput.status.optional(),

    category_id: VehicleInput.category_id.optional()

});

export type UpdateVehicleRequest =z.infer<
    typeof UpdateVehicleRequestSchema
>;