import { ResultSetHeader, RowDataPacket } from "mysql2";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import { RentalRow } from "../types/rental.row.js";
import { getExecutor } from "../../../../core/config/executor.config.js";
import { CreateRentalRequest } from "@locadora/shared/rental/request/create-rental.request.js";

export default class RentalRepository {

    public static async getAll(

    ): Promise<Array<RentalRow>> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<RentalRow>>(
                `
                SELECT 
                    id, 
                    start_date, 
                    expected_return_date, 
                    return_date,
                    daily_price_cents,
                    total_price_cents,
                    status
                FROM rentals
                WHERE deleted_at IS NULL
                `
            );
        
        return result;

    };

    public static async getAllById(
        id: number
    ): Promise<Array<RentalRow>> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<RentalRow>>(
                `
                SELECT 
                    id, 
                    start_date, 
                    expected_return_date, 
                    return_date,
                    daily_price_cents,
                    total_price_cents,
                    status
                FROM rentals
                WHERE user_id = ?
                AND deleted_at IS NULL
                `,
                [
                    id
                ]
            );
        
        return result;

    };

    public static async getById(
        id: number
    ): Promise<RentalRow | null> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<RentalRow>>(
                `
                SELECT 
                    id, 
                    start_date, 
                    expected_return_date, 
                    return_date,
                    daily_price_cents,
                    total_price_cents,
                    status,
                    user_id,
                    vehicle_id
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

    public static async create(
        data: TypedBody<CreateRentalRequest> & {
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

    public static async cancel(
        id: number
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            UPDATE rentals
            SET
                status = 'CANCELLED',
                updated_at = CURRENT_TIMESTAMP,
                return_date = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                id
            ]
        );

    };

};