import { ImageMetadata } from "./image-metadata.type.js";

export type Processor = (
    variant: string,
    buffer: Buffer<ArrayBufferLike>
) => Promise<ImageMetadata>;