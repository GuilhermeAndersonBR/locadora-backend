import { ResultSetHeader, RowDataPacket } from "mysql2";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import { db } from "../../../config/database.js";
import CreateRentalSchema from "../schema/create-rental.schema.js";
import { RentalRow } from "../types/rental.row.js";
import { DBExecutor } from "../../../../core/types/db-executor.type.js";
import { getExecutor } from "../../../../core/config/executor.config.js";

export default class RentalRepository {

    public static async create(
        data: TypedBody<typeof CreateRentalSchema> & {
            daily_price_cents: number,
            total_price_cents: number
        }
    ): Promise<number> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<
                ResultSetHeader
            >(
                `
                INSERT INTO rentals
                (
                    user_id,
                    vehicle_id,
                    start_date,
                    expected_return_date,
                    daily_price_cents,
                    total_price_cents
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    data.user_id,
                    data.vehicle_id,
                    data.start_date,
                    data.expected_return_date,
                    data.daily_price_cents,
                    data.total_price_cents
                ]
            );

        return result.insertId;

    };

    public static async hasActiveRental(
        vehicle_id: number
    ): Promise<boolean> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<RowDataPacket>>(
                `
                SELECT id
                FROM rentals
                WHERE vehicle_id = ?
                AND status = 'ACTIVE'
                `,
                [
                    vehicle_id
                ]
            );
        
        return result.length > 0;

    };

    public static async findById(
        id: number
    ): Promise<RentalRow | null> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<RentalRow>>(
                `
                SELECT *
                FROM rentals
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

    public static async finish(
        id: number,
        total_price_cents: number
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            UPDATE rentals
            SET
                status = 'FINISHED',
                total_price_cents = ?,
                updated_at = CURRENT_TIMESTAMP,
                return_date = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                total_price_cents,
                id
            ]
        );

    };

};