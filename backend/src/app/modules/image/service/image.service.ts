import ImageInternalService from "../../../../core/services/image/image-internal.service.js";
import { Processors } from "../../../../core/types/image/processors.type.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import ImageRepository from "../repository/image.repository.js";
import { ProcessedImage } from "../../../../core/types/image/processed-image.type.js";
import { FindImageRequest } from "@locadora/shared/image/request/find-image.request.js";

export default abstract class ImageService {

    public static async getAll(): Promise<Record<string, any>> {
        
        const images = await ImageRepository.getAll();

        return images;

    };

    public static async upload(
        data: TypedBody<FindImageRequest> & {
            file: Express.Multer.File,
            processors: Processors
        }
    ): Promise<Array<ProcessedImage>> {

        const images = await ImageInternalService.uploadImages(
            data.file,
            data.processors
        );

        await Promise.all(images.map(
            async asset => await ImageRepository.create({
                ...asset,
                ...data
            })
        ));

        return images;

    };

    public static async find(
        data: TypedBody<FindImageRequest>
    ): Promise<Array<ProcessedImage>> {

        const images = await ImageRepository.find(data);

        return images;

    };

    public static async delete(
        data: TypedBody<FindImageRequest>
    ): Promise<void> {

        await ImageRepository.delete(data);
    
    };

};