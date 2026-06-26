import { ResultSetHeader } from "mysql2";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import CreateCategorySchema from "../schema/create-category.schema.js";
import { db } from "../../../config/database.js";
import { CategoryRow } from "../types/category.row.js";
import { UpdateCategorySchema } from "../schema/update-category.schema.js";
import { DBExecutor } from "../../../../core/types/db-executor.type.js";
import { getExecutor } from "../../../../core/config/executor.config.js";

export default class CategoryRepository {

    public static async getAll(

    ): Promise<Array<CategoryRow>> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<CategoryRow>
        >(
            `
            SELECT 
                id, name, description
            FROM categories
            WHERE deleted_at IS NULL
            `
        );

        return result;

    };

    public static async create(
        data: TypedBody<typeof CreateCategorySchema>
    ): Promise<number> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            ResultSetHeader
        >(
            `
            INSERT INTO categories
            (name, description)
            VALUES (?, ?)
            `,
            [
                data.name,
                data.description
            ]
        );

        return result.insertId;

    };

    public static async findById(
        id: number
    ): Promise<CategoryRow | null> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<CategoryRow>
        >(
            `
            SELECT *
            FROM categories
            WHERE id = ?
            AND deleted_at IS NULL
            LIMIT 1
            `,
            [
                id
            ]
        );

        return result[0] ?? null;

    };

    public static async update(
        data: TypedBody<typeof UpdateCategorySchema> & {
            id: number
        }
    ): Promise<void> {

        const executor = getExecutor();

        const fields: Array<string> = [];
        const values: Array<unknown> = [];

        if (data.name !== undefined) {
            fields.push("name = ?");
            values.push(data.name);
        }

        if (data.description !== undefined) {
            fields.push("description = ?");
            values.push(data.description);
        }

        values.push(data.id);

        await executor.query(
            `
            UPDATE categories
            SET ${fields.join(", ")},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            values
        );

    };

    public static async delete(
        id: number
    ): Promise<void> {

        const executor = getExecutor();

        const [ result ] = await executor.query(
            `
            UPDATE categories
            SET
                deleted_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                id
            ]
        );

    };

};