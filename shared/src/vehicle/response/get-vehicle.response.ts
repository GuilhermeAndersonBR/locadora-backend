import z from "zod";
import VehicleStatus from "../types/vehicle-status.type.js";
import { CreateImageResponseSchema } from "../../image/response/create-image.res.js";

export const GetVehicleResponseSchema = z.object({

    id: z.number().int().positive(),

    plate: z.string(),

    brand: z.string(),

    model: z.string(),

    year: z.number().int().positive(),

    daily_rate: z.number().int().positive(),

    status: z.enum([
        VehicleStatus.AVAILABLE,
        VehicleStatus.RENTED,
        VehicleStatus.MAINTENANCE
    ]),

    images: z.array(
        CreateImageResponseSchema
    ),

    category_id: z.number().int().positive()

});

export type GetVehicleResponse = z.infer<
    typeof GetVehicleResponseSchema
>;