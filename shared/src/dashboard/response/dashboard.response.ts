import z from "zod";

export const DashboardResponseSchema = z.object({
    availableVehicles: z.number(),

    highestRateVehicle: z.object({
        brand: z.string(),
        model: z.string(),
        daily_rate: z.number()
    }).optional(),

    vehiclesByCategory: z.array(z.object({
        name: z.string(),
        total: z.number()
    }))
})

export type DashboardResponse = z.infer<
    typeof DashboardResponseSchema
>;
