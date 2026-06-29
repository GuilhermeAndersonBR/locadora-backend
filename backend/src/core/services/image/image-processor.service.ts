import sharp from "sharp";
import { ImageMetadata } from "../../types/image/image-metadata.type.js";

export default abstract class ImageProcessor {

    public static async original(
        variant: string,
        buffer: Buffer
    ): Promise<ImageMetadata> {

        const image = await sharp(buffer)
            .resize({
                width: 1200,
                withoutEnlargement: true
            })
            .webp({
                quality: 85
            })
            .toBuffer();

        const metadata = await sharp(image).metadata();
        
        return {
            variant,
            buffer: image,
            mime_type: "image/webp",
            size: image.length,
            width: metadata.width,
            height: metadata.height
        };

    };

    public static async medium(
        variant: string,
        buffer: Buffer
    ): Promise<ImageMetadata> {

        const image = await sharp(buffer)
            .resize({
                width: 600,
                withoutEnlargement: true
            })
            .webp({
                quality: 80
            })
            .toBuffer();

        const metadata = await sharp(image).metadata();
        
        return {
            variant,
            buffer: image,
            mime_type: "image/webp",
            size: image.length,
            width: metadata.width,
            height: metadata.height
        };

    };

    public static async thumbnail(
        variant: string,
        buffer: Buffer
    ): Promise<ImageMetadata> {

        const image = await sharp(buffer)
            .resize({
                width: 250,
                height: 250,
                fit: "cover"
            })
            .webp({
                quality: 75
            })
            .toBuffer();

        const metadata = await sharp(image).metadata();
        
        return {
            variant,
            buffer: image,
            mime_type: "image/webp",
            size: image.length,
            width: metadata.width,
            height: metadata.height
        };

    };

};