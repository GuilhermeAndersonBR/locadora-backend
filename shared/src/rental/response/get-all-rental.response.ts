import z from "zod";
import RentalStatus from "../types/rental-status.types.js";

export const GetAllRentalResponseSchema = z.array(z.object({

    id: z.number(),

    start_date: z.string(),
    
    expected_return_date: z.string(),

    return_date: z.string().optional(),

    daily_price_cents: z.number(),

    total_price_cents: z.number(),

    status: z.enum([
        RentalStatus.ACTIVE,
        RentalStatus.CANCELLED,
        RentalStatus.FINISHED
    ]),

    vehicle: z.object({

        id: z.number(),

        plate: z.string(),

        brand: z.string(),

        model: z.string()

    })
    
}));

export type GetAllRentalResponse = z.infer<
    typeof GetAllRentalResponseSchema
>;