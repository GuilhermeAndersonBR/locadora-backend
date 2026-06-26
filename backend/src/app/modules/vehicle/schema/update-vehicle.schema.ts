import z from "zod";
import { ZodSchema } from "zod/v3";
import { VehicleField } from "../field/vehicle.field.js";

const UpdateVehicleSchema = z.object({

    plate: VehicleField.plate.optional(),

    brand: VehicleField.brand.optional(),

    model: VehicleField.model.optional(),

    year: VehicleField.year.optional(),

    daily_rate: VehicleField.daily_rate.optional(),

    status: VehicleField.status.optional(),

    category_id: VehicleField.category_id.optional()

});

type UpdateVehicleSchema = ZodSchema<
    z.infer<
        typeof UpdateVehicleSchema
    >
>;

export default UpdateVehicleSchema;