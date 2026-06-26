import { RowDataPacket } from "mysql2";

export interface CategoryRow extends RowDataPacket {

    id: number;

    name: string;

    description: string;

    created_at: Date;

    updated_at: Date | null;

    deleted_at: Date | null;

};