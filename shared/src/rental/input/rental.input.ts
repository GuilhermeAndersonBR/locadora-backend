import { z } from "zod";

export const RentalInput = {

    user_id: z
        .coerce
        .number({
            required_error: "USER_ID_REQUIRED",
            invalid_type_error: "USER_ID_MUST_BE_NUMBER"
        })
        .int({
            message: "USER_ID_MUST_BE_INTEGER"
        })
        .positive({
            message: "USER_ID_MUST_BE_POSITIVE"
        }),

    vehicle_id: z
        .coerce
        .number({
            required_error: "VEHICLE_ID_REQUIRED",
            invalid_type_error: "VEHICLE_ID_MUST_BE_NUMBER"
        })
        .int({
            message: "VEHICLE_ID_MUST_BE_INTEGER"
        })
        .positive({
            message: "VEHICLE_ID_MUST_BE_POSITIVE"
        }),

    start_date: z
        .preprocess(
            (val) => new Date(val as string),
            z.date({
                required_error: "START_DATE_REQUIRED",
                invalid_type_error: "START_DATE_INVALID"
            })
        )
        .refine(
            date => date.getTime() > Date.now(),
            {
                message: "START_DATE_MUST_BE_IN_FUTURE"
            }
        ),

    expected_return_date: z
        .preprocess(
            (val) => new Date(val as string),
            z.date({
                required_error: "EXPECTED_RETURN_DATE_REQUIRED",
                invalid_type_error: "EXPECTED_RETURN_DATE_INVALID"
            })
        )
        .refine(
            date => date.getTime() > Date.now(),
            {
                message: "EXPECTED_RETURN_DATE_MUST_BE_IN_FUTURE"
            }
        )

};