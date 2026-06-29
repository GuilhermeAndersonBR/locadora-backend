import { ResultSetHeader } from "mysql2";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import Role from "../../../../../../shared/src/user/types/user-role.type.js";
import { UserRow } from "../types/user.row.js";
import { getExecutor } from "../../../../core/config/executor.config.js";
import { CreateUserRequest } from "@locadora/shared/user/request/create-user.request.js";
import { UpdateUserRequest } from "@locadora/shared/user/request/update-user.request.js";
import { UpdateUserPasswordRequest } from "@locadora/shared/user/request/update-password-request.js";
import { UpdateUserRoleRequest } from "@locadora/shared/user/request/update-role.request.js";
import { DeleteUserRequest } from "@locadora/shared/user/request/delete-user.request.js";

export default class UserRepository {

    public static async getAll(

    ): Promise<Array<UserRow>> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<UserRow>
        >(
            `
            SELECT 
                id, name, email, role
            FROM users
            WHERE deleted_at IS NULL
            `,
            []
        );

        return result;

    };

    public static async create(
        data: TypedBody<CreateUserRequest> & {
            role: Role
        }
    ): Promise<number> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            ResultSetHeader
        >(
            `
            INSERT INTO users
            (name, email, cpf, password_hash, role)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                data.name,
                data.email,
                data.cpf,
                data.password,
                data.role
            ]
        );

        return result.insertId;

    };

    public static async getById(
        id: number
    ): Promise<UserRow | null> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<UserRow>
        >(
            `
            SELECT *
            FROM users
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

    public static async getByEmail(
        email: string
    ): Promise<UserRow | null> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            Array<UserRow>
        >(
            `
            SELECT *
            FROM users
            WHERE email = ?
            AND deleted_at IS NULL
            LIMIT 1
            `,
            [
                email
            ]
        );

        return result[0] ?? null;

    };

    public static async getByCPF(
        cpf: string
    ): Promise<UserRow | null> {

        const executor = getExecutor();
        
        const [ result ] = await executor.execute<
            Array<UserRow>
        >(
            `
            SELECT *
            FROM users
            WHERE cpf = ?
            AND deleted_at IS NULL
            LIMIT 1
            `,
            [
                cpf
            ]
        );

        return result[0] ?? null;

    };

    public static async update(
        data: TypedBody<UpdateUserRequest> & {
            id: number
        }
    ): Promise<void> {

        const executor = getExecutor();

        const fields: Array<string> = [];

        const values: Array<unknown> = [];

        if (data.name !== undefined) {

            fields.push("name = ?");

            values.push(data.name);

        };

        if (data.email !== undefined) {

            fields.push("email = ?");

            values.push(data.email);

        };

        if (data.cpf !== undefined) {

            fields.push("cpf = ?");

            values.push(data.cpf);

        };

        values.push(data.id);

        await executor.query(
            `
            UPDATE users
            SET
                ${fields.join(", ")},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            values
        );

    };

    public static async updatePassword(
        data: TypedBody<UpdateUserPasswordRequest> & {
            id: number
        }
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            UPDATE users
            SET
                password_hash = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                data.newPassword,
                data.id
            ]
        );

    };

    public static async updateRole(
        data: TypedBody<UpdateUserRoleRequest> & {
            id: number
        }
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            UPDATE users
            SET
                role = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                data.newRole,
                data.id
            ]
        );

    };

    public static async delete(
        data: TypedBody<DeleteUserRequest> & {
            id: number
        }
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            UPDATE users
            SET
                deleted_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                data.id
            ]
        );

    };

};