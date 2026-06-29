import { z } from "zod";

export const RentalInput = {

    user_id: z
        .number({
            error: "USER_ID_REQUIRED"
        })
        .int({
            error: "USER_ID_MUST_BE_INTEGER"
        })
        .positive({
            error: "USER_ID_MUST_BE_POSITIVE"
        }),
    
    vehicle_id: z
        .number({
            error: "VEHICLE_ID_REQUIRED"
        })
        .int({
            error: "VEHICLE_ID_MUST_BE_INTEGER"
        })
        .positive({
            error: "VEHICLE_ID_MUST_BE_POSITIVE"
        }),

    start_date: z
        .date({
            error: "START_DATE_REQUIRED"
        })
        .min(new Date(), {
            error: "START_DATE_MUST_BE_IN_FUTURE"
        }),
    
    expected_return_date: z
        .date({
            error: "EXPECTED_RETURN_DATE_REQUIRED"
        })
        .min(new Date(), {
            error: "EXPECTED_RETURN_DATE_MUST_BE_IN_FUTURE"
        })

};