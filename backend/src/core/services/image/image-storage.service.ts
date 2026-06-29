import fs from "node:fs/promises";
import path from "node:path";
import { ImageMetadata } from "../../types/image/image-metadata.type.js";
import { ProcessedImage } from "../../types/image/processed-image.type.js";

export default abstract class ImageStorageService {

    private static readonly _STORAGE_DIR = [
        "uploads",
        "images"
    ]

    private static readonly _STORAGE_PATH = path.resolve(
        ...this._STORAGE_DIR
    );

    public static async save(
        folder: string,
        filename: string,
        metadata: ImageMetadata
    ): Promise<ProcessedImage> {
        
        const dir = path.resolve(
            this._STORAGE_PATH,
            folder
        );

        await fs.mkdir(dir, { recursive: true });

        const filePath = path.join(
            dir,
            filename
        );

        await fs.writeFile(
            filePath,
            metadata.buffer
        );

        const storage_key = 
            this._STORAGE_DIR.join("/") + 
            `/${folder}/${filename}`;

        return {
            variant: metadata.variant,
            storage_key,
            mime_type: metadata.mime_type,
            size: metadata.size,
            width: metadata.width,
            height: metadata.height
        };

    };

};