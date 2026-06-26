import { z } from "zod";

export const VehicleField = {

    plate: z
        .string({
            error: "PLATE_REQUIRED"
        })
        .trim()
        .min(7, "PLATE_TOO_SHORT")
        .max(10, "PLATE_TOO_LONG"),
    
    brand: z
        .string({
            error: "BRAND_REQUIRED"
        })
        .trim()
        .min(3, "BRAND_TOO_SHORT")
        .max(50, "BRAND_TOO_LONG"),
    
    model: z
        .string({
            error: "MODEL_REQUIRED"
        })
        .trim()
        .min(3, "MODEL_TOO_SHORT")
        .max(50, "MODEL_TOO_LONG"),
    
    year: z
        .number({
            error: "YEAR_REQUIRED"
        })
        .min(1900, "YEAR_TOO_LOW")
        .max(2023, "YEAR_TOO_HIGH"),
    
    daily_rate: z
        .number({
            error: "DAILY_RATE_REQUIRED"
        })
        .int({
            error: "DAILY_RATE_MUST_BE_INTEGER"
        })
        .positive({
            error: "DAILY_RATE_MUST_BE_POSITIVE"
        }),
    
    status: z.enum(
        [
            "AVAILABLE",
            "RENTED",
            "MAINTENANCE"
        ], 
        {
            error: "STATUS_REQUIRED"
        }
    ),

    category_id: z
        .number({
            error: "CATEGORY_ID_REQUIRED"
        })

};