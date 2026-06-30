import { z } from "zod";

import ImageEntityType from "@locadora/shared/image/types/image-entity.type.js";

export const ImageInput = {

    entity_type: z
        .enum([
            ImageEntityType.USER,
            ImageEntityType.VEHICLE,
        ], {
            required_error: "ENTITY_TYPE_REQUIRED"
        }),
    
    entity_id: z
        .number({
            required_error: "ENTITY_ID_REQUIRED"
        })
        .int("ENTITY_ID_MUST_BE_INTEGER")
        .positive("ENTITY_ID_MUST_BE_POSITIVE"),
    
    entity: z
        .number({
            required_error: "ENTITY_ID_REQUIRED"
        })
        .int("ENTITY_ID_MUST_BE_INTEGER")
        .positive("ENTITY_ID_MUST_BE_POSITIVE"),

    variant: z
        .string({
            required_error: "VARIANT_REQUIRED"
        })
        .trim(),

    storage_key: z
        .string({
            required_error: "STORAGE_KEY_REQUIRED"
        })
        .trim(),
    
    mime_type: z
        .string({
            required_error: "MIME_TYPE_REQUIRED"
        })
        .trim(),
    
    size: z
        .coerce
        .number({
            required_error: "SIZE_REQUIRED"
        })
        .int("SIZE_MUST_BE_INTEGER")
        .positive("SIZE_MUST_BE_POSITIVE"),
    
    width: z
        .coerce
        .number({
            required_error: "WIDTH_REQUIRED"
        })
        .int("WIDTH_MUST_BE_INTEGER")
        .positive("WIDTH_MUST_BE_POSITIVE"),
    
    height: z
        .number({
            required_error: "HEIGHT_REQUIRED"
        })
        .int("HEIGHT_MUST_BE_INTEGER")
        .positive("HEIGHT_MUST_BE_POSITIVE")

};