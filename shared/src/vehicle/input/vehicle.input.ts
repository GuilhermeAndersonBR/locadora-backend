import { z } from "zod";
import VehicleStatus from "../types/vehicle-status.type.js";

export const VehicleInput = {

    plate: z
        .string({
            required_error: "PLATE_REQUIRED"
        })
        .trim()
        .min(7, {
            message: "PLATE_TOO_SHORT"
        })
        .max(10, {
            message: "PLATE_TOO_LONG"
        })
        .refine(
            plate =>
                /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(plate),
            {
                message: "INVALID_PLATE"
            }
        ),

    brand: z
        .string({
            required_error: "BRAND_REQUIRED"
        })
        .trim()
        .min(3, {
            message: "BRAND_TOO_SHORT"
        })
        .max(50, {
            message: "BRAND_TOO_LONG"
        }),

    model: z
        .string({
            required_error: "MODEL_REQUIRED"
        })
        .trim()
        .min(3, {
            message: "MODEL_TOO_SHORT"
        })
        .max(50, {
            message: "MODEL_TOO_LONG"
        }),

    year: z
        .coerce
        .number({
            required_error: "YEAR_REQUIRED",
            invalid_type_error: "YEAR_MUST_BE_NUMBER"
        })
        .min(1900, {
            message: "YEAR_TOO_LOW"
        })
        .max(new Date().getFullYear(), {
            message: "YEAR_TOO_HIGH"
        }),

    daily_rate: z
        .coerce
        .number({
            required_error: "DAILY_RATE_REQUIRED",
            invalid_type_error: "DAILY_RATE_MUST_BE_NUMBER"
        })
        .int({
            message: "DAILY_RATE_MUST_BE_INTEGER"
        })
        .positive({
            message: "DAILY_RATE_MUST_BE_POSITIVE"
        }),

    status: z.enum([
        VehicleStatus.AVAILABLE,
        VehicleStatus.RENTED,
        VehicleStatus.MAINTENANCE
    ]),

    category_id: z
        .coerce
        .number({
            required_error: "CATEGORY_ID_REQUIRED"
        })
        .int()
        .positive()

};