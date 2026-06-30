import { QueryResult, RowDataPacket } from "mysql2";
import { getExecutor } from "../../../../core/config/executor.config.js";
import { GetVehicleResponse } from "@locadora/shared/vehicle/response/get-vehicle.response.js";
import { VehicleRow } from "../../vehicle/types/vehicle.row.js";

export default abstract class DashboardRepository {

    public static async availableVehicles(

    ): Promise<number> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<{ count: number } & RowDataPacket>
        >(
            `
            SELECT COUNT(*) AS count
            FROM vehicles
            WHERE status = 'AVAILABLE'
            AND deleted_at IS NULL
            `,
            []
        );

        return result[0].count ?? 0;

    };

    public static async vehicleWithMostDailyRate(

    ): Promise<GetVehicleResponse | null> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<VehicleRow>
        >(
            `
            SELECT 
                brand, 
                model, 
                daily_rate
            FROM vehicles
            WHERE deleted_at IS NULL
            ORDER BY daily_rate DESC
            LIMIT 1
            `,
            []
        );

        return result[0] ?? null;

    };

    public static async vehiclesByCategory(

    ): Promise<
        Array<{
            name: string,
            total: number
        } & RowDataPacket>
    > {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<{
                name: string,
                total: number
            } & RowDataPacket>
        >(
            `
            SELECT
                c.name,
                COUNT(v.id) AS total
            FROM categories c
            LEFT JOIN vehicles v
                ON v.category_id = c.id
            GROUP BY c.id, c.name
            ORDER BY total DESC;
            `,
            []
        );

        return result;

    };

};