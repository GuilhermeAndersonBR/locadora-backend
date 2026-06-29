import z from "zod";
import { ImageInput } from "../input/image.input.js";

export const CreateImageRequestSchema = z.object({

    entity_type: ImageInput.entity_type,

    entity_id: ImageInput.entity_id,

    variant: ImageInput.variant,

    storage_key: ImageInput.storage_key,

    mime_type: ImageInput.mime_type,

    size: ImageInput.size,

    width: ImageInput.width,

    height: ImageInput.height,

});

export type CreateImageRequest = z.infer<
    typeof CreateImageRequestSchema
>;