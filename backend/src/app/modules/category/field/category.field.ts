import { z } from "zod";

export const CategoryField = {
    name: z
        .string({
            error: "NAME_REQUIRED"
        })
        .trim()
        .min(3, "NAME_TOO_SHORT")
        .max(50, "NAME_TOO_LONG"),

    description: z
        .string({
            error: "DESCRIPTION_REQUIRED"
        })
        .trim()
        .min(3, "DESCRIPTION_TOO_SHORT")
        .max(255, "DESCRIPTION_TOO_LONG")
};