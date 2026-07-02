import UserRole from "@locadora/shared/user/types/user-role.type.js";
import { QueryResult, RowDataPacket } from "mysql2";

export interface UserRow extends RowDataPacket {

    id: number;

    name: string;

    email: string;

    password_hash: string;

    role: UserRole;

    created_at: Date;

    updated_at: Date | null;

    deleted_at: Date | null;

};