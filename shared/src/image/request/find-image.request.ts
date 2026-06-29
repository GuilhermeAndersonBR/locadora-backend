import z from "zod";
import { ImageInput } from "../input/image.input.js";

export const FindImageRequestSchema = z.object({

    entity_type: ImageInput.entity_type,

    entity_id: ImageInput.entity_id,

});

export type FindImageRequest = z.infer<
    typeof FindImageRequestSchema
>;