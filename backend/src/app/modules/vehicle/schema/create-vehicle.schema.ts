import z from "zod";
import { ZodSchema } from "zod/v3";
import { VehicleField } from "../field/vehicle.field.js";

const CreateVehicleSchema = z.object({

    plate: VehicleField.plate,

    brand: VehicleField.brand,

    model: VehicleField.model,

    year: VehicleField.year,

    daily_rate: VehicleField.daily_rate,

    status: VehicleField.status,

    category_id: VehicleField.category_id

});

type CreateVehicleSchema = ZodSchema<
    z.infer<
        typeof CreateVehicleSchema
    >
>;

export default CreateVehicleSchema;