import { z } from "zod";

import ImageEntityType from "@locadora/shared/image/types/image-entity.type.js";

export const ImageInput = {

    entity_type: z
        .enum(Object.values(ImageEntityType), {
            error: "ENTITY_TYPE_REQUIRED"
        }),
    
    entity_id: z
        .number({
            error: "ENTITY_ID_REQUIRED"
        })
        .int({
            error: "ENTITY_ID_MUST_BE_INTEGER"
        })
        .positive({
            error: "ENTITY_ID_MUST_BE_POSITIVE"
        }),
    
    entity: z
        .number({
            error: "ENTITY_ID_REQUIRED"
        })
        .int({
            error: "ENTITY_ID_MUST_BE_INTEGER"
        })
        .positive({
            error: "ENTITY_ID_MUST_BE_POSITIVE"
        }),

    variant: z
        .string({
            error: "VARIANT_REQUIRED"
        })
        .trim(),

    storage_key: z
        .string({
            error: "STORAGE_KEY_REQUIRED"
        })
        .trim(),
    
    mime_type: z
        .string({
            error: "MIME_TYPE_REQUIRED"
        })
        .trim(),
    
    size: z
        .number({
            error: "SIZE_REQUIRED"
        })
        .int({
            error: "SIZE_MUST_BE_INTEGER"
        })
        .positive({
            error: "SIZE_MUST_BE_POSITIVE"
        }),
    
    width: z
        .number({
            error: "WIDTH_REQUIRED"
        })
        .int({
            error: "WIDTH_MUST_BE_INTEGER"
        })
        .positive({
            error: "WIDTH_MUST_BE_POSITIVE"
        }),
    
    height: z
        .number({
            error: "HEIGHT_REQUIRED"
        })
        .int({
            error: "HEIGHT_MUST_BE_INTEGER"
        })
        .positive({
            error: "HEIGHT_MUST_BE_POSITIVE"
        })

};