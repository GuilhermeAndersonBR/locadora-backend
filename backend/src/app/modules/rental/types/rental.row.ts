import { RowDataPacket } from "mysql2";
import RentalStatus from "@locadora/shared/rental/types/rental-status.types.js";
export interface RentalRow extends RowDataPacket {
    
    id: number;

    user_id: number;

    vehicle_id: number;

    start_date: Date;

    expected_return_date: Date;

    return_date: Date | null;

    daily_price_cents: number;

    total_price_cents: number;

    status: RentalStatus;

    created_at: Date;

    updated_at: Date | null;

    deleted_at: Date | null;

};