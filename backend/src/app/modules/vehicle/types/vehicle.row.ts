import { RowDataPacket } from "mysql2";
import VehicleStatus from "../../../../../../shared/src/vehicle/types/vehicle-status.type.js";

export interface VehicleRow extends RowDataPacket {

    id: number;

    plate: string;

    brand: string;

    model: string;

    year: number;

    daily_rate: number;

    status: VehicleStatus;

    category_id: number;

    created_at: Date;

    updated_at: Date | null;

    deleted_at: Date | null;

};