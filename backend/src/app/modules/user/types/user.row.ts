import { QueryResult, RowDataPacket } from "mysql2";
import Role from "../../../../../../shared/src/user/types/user-role.type.js";

export interface UserRow extends RowDataPacket {

    id: number;

    name: string;

    email: string;

    password_hash: string;

    role: Role;

    created_at: Date;

    updated_at: Date | null;

    deleted_at: Date | null;

};