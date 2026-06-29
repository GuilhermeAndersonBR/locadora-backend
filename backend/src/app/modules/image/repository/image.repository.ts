import { ResultSetHeader } from "mysql2";
import { getExecutor } from "../../../../core/config/executor.config.js";
import { ImageRow } from "../types/image.row.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import { CreateImageRequest } from "@locadora/shared/image/request/create-image.request.js";
import { FindImageRequest } from "@locadora/shared/image/request/find-image.request.js";

export default class ImageRepository {

    public static async getAll(

    ): Promise<Array<ImageRow>> {

        const executor = getExecutor();

        const [ result ] = 
            await executor.execute<Array<ImageRow>>(
                `
                SELECT *
                FROM images
                `,
                []
            );
        
        return result;

    };

    public static async create(
        data: TypedBody<CreateImageRequest>
    ): Promise<number> {

        const executor = getExecutor();

        const [ result ] = 
            await executor.execute<ResultSetHeader>(
                `
                INSERT INTO images
                (
                    entity_type,
                    entity_id,
                    variant,
                    storage_key,
                    mime_type,
                    size,
                    width,
                    height
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    data.entity_type,
                    data.entity_id,
                    data.variant,
                    data.storage_key,
                    data.mime_type,
                    data.size,
                    data.width,
                    data.height
                ]
            );
        
        return result.insertId;

    };

    public static async find(
        data: TypedBody<FindImageRequest>
    ): Promise<Array<ImageRow>> {

        const executor = getExecutor();

        const [ result ] = 
            await executor.execute<Array<ImageRow>>(
                `
                SELECT *
                FROM images
                WHERE
                    entity_type = ?
                    AND entity_id = ?
                `,
                [
                    data.entity_type,
                    data.entity_id
                ]
            );
        
        return result;

    };

    public static async delete(
        data: TypedBody<FindImageRequest>
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            DELETE FROM images
            WHERE
                entity_type = ?
                AND entity_id = ?
            `,
            [
                data.entity_type,
                data.entity_id
            ]
        );

    };

};