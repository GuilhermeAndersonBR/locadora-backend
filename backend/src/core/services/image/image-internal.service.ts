import sharp from "sharp";
import { v4 as uuid } from "uuid";

import ImageProcessor from "./image-processor.service.js";
import ImageStorage from "./image-storage.service.js";
import InvalidError from "../../errors/invalid-error.js";
import { ProcessedImage } from "../../types/image/processed-image.type.js";
import { Processor } from "../../types/image/processor.type.js";
import { Processors } from "../../types/image/processors.type.js";

export default class ImageInternalService {

    public static async uploadImages(
        file: Express.Multer.File,
        processors: Processors
    ): Promise<Array<ProcessedImage>> {

        if (
            ![
                "image/jpeg",
                "image/png",
                "image/webp"
            ].includes(
                file.mimetype
            )
        ) throw new InvalidError(
            "INVALID_FILE_TYPE"
        );

        const filename =
            `${uuid()}.webp`;

        const treatedProcessors = await Promise.all(
            
            processors.map(
                async ({ name, processor }) => ({
                    
                    name,

                    metadata: await processor(
                        name,
                        file.buffer
                    )

                })
            )
        
        );

        return await Promise.all(treatedProcessors.map(
            ({ name, metadata }) => ImageStorage.save(
                name,
                filename,
                metadata
            )
        ));

    };

};