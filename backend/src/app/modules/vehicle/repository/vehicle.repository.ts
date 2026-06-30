import { ResultSetHeader } from "mysql2";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import { VehicleRow } from "../types/vehicle.row.js";
import { getExecutor } from "../../../../core/config/executor.config.js";
import { CreateVehicleRequest } from "@locadora/shared/vehicle/request/create-vehicle.schema.js";
import VehicleStatus from "@locadora/shared/vehicle/types/vehicle-status.type.js";
import { UpdateVehicleRequest } from "@locadora/shared/vehicle/request/update-vehicle.schema.js";
import { AllVehiclesResponse } from "@locadora/shared/vehicle/response/all-vehicles.response.js";
import { GetVehicleResponse } from "@locadora/shared/vehicle/response/get-vehicle.response.js";

export default class VehicleRepository {


    public static async getAll(): Promise<
        AllVehiclesResponse
    > {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<VehicleRow>
        >(
            `
            SELECT 
                id, 
                plate, 
                brand, 
                model, 
                year, 
                daily_rate, 
                status, 
                category_id
            FROM vehicles
            WHERE deleted_at IS NULL
            `
        );

        return result;

    };

    public static async create(
        data: TypedBody<CreateVehicleRequest> & {
            status: VehicleStatus
        }
    ): Promise<number> {

        const executor = getExecutor();

        const {
            plate,
            brand,
            model,
            year,
            daily_rate,
            status,
            category_id
        } = data;

        const [ result ] = await executor.execute<ResultSetHeader>(
            `
            INSERT INTO vehicles
            (plate, brand, model, year, daily_rate, status, category_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                plate,
                brand,
                model,
                year,
                daily_rate,
                status,
                category_id
            ]
        );

        return result.insertId;

    };

    public static async findById(
        id: number
    ): Promise<GetVehicleResponse | null> {

        const executor = getExecutor();
        
        const [ result ] = await executor.execute<
            Array<VehicleRow>
        >(
            `
            SELECT
                id, 
                plate, 
                brand, 
                model, 
                year, 
                daily_rate, 
                status, 
                category_id
            FROM vehicles
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

    public static async findByPlate(
        plate: string
    ): Promise<VehicleRow | null> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<VehicleRow>
        >(
            `
            SELECT *
            FROM vehicles
            WHERE plate = ?
            AND deleted_at IS NULL
            LIMIT 1
            `,
            [
                plate
            ]
        );

        return result[0] ?? null;

    };

    public static async update(
        data: TypedBody<UpdateVehicleRequest> & {
            id: number
        }
    ): Promise<void> {

        const executor = getExecutor();

        const fields: Array<string> = [];

        const values: Array<unknown> = [];

        if (data.plate !== undefined) {

            fields.push("plate = ?");

            values.push(data.plate);

        };

        if (data.brand !== undefined) {

            fields.push("brand = ?");

            values.push(data.brand);

        };

        if (data.model !== undefined) {

            fields.push("model = ?");

            values.push(data.model);

        };

        if (data.year !== undefined) {

            fields.push("year = ?");

            values.push(data.year);

        };

        if (data.daily_rate !== undefined) {

            fields.push("daily_rate = ?");

            values.push(data.daily_rate);

        };

        if (data.status !== undefined) {

            fields.push("status = ?");

            values.push(data.status);

        };

        if (data.category_id !== undefined) {

            fields.push("category_id = ?");

            values.push(data.category_id);

        };

        values.push(data.id);

        await executor.query(
            `
            UPDATE vehicles
            SET
                ${fields.join(", ")},
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

        await executor.query(
            `
            UPDATE vehicles
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