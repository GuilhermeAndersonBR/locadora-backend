import { ResultSetHeader } from "mysql2";
import { getExecutor } from "../../../../core/config/executor.config.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import { PaymentRow } from "../types/payment.row.js";
import { CreatePaymentRequest } from "@locadora/shared/payment/request/create-payment.request.js";
import PaymentStatus from "@locadora/shared/payment/types/payment-status.type.js";
import { UpdatePaymentRequest } from "@locadora/shared/payment/request/update-payment.request.js";

export default abstract class PaymentRepository {

    public static async getAll(

    ): Promise<Array<PaymentRow>> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<PaymentRow>>(
                `
                SELECT
                    id,
                    amount,
                    payment_method,
                    status,
                    payment_date,
                    rental_id,
                    created_at
                FROM payments
                WHERE deleted_at IS NULL
                `,
            );
        
        return result;

    };

    public static async getAllByUserId(
        userId: number
    ): Promise<Array<PaymentRow>> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<PaymentRow>>(
                `
                SELECT
                    p.id,
                    p.amount,
                    p.payment_method,
                    p.status,
                    p.payment_date,
                    p.rental_id
                FROM payments AS p
                INNER JOIN rentals AS r ON r.id = p.rental_id
                WHERE r.user_id = ?
                AND p.deleted_at IS NULL
                `,
                [
                    userId
                ]
            );
        
        return result;

    };

    public static async create(
        data: TypedBody<CreatePaymentRequest> & {
            amount: number;
            status: PaymentStatus;
            payment_date?: Date;
        }
    ): Promise<number> {

        const executor = getExecutor();

        const [ result ] = await executor.execute<
            ResultSetHeader
        >(
            `
            INSERT INTO payments (
                amount,
                payment_method,
                status,
                payment_date,
                rental_id
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                data.amount,
                data.payment_method,
                data.status,
                data.payment_date ?? null,
                data.rental_id
            ]
        );

        return result.insertId;

    };

    public async findById(
        id: number
    ): Promise<PaymentRow | null> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<PaymentRow>>(
                `
                SELECT *
                FROM payments
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

    public static async findByRentalId(
        rentalId: number
    ): Promise<PaymentRow | null> {

        const executor = getExecutor();

        const [ result ] =
            await executor.execute<Array<PaymentRow>>(
                `
                SELECT *
                FROM payments
                WHERE rental_id = ?
                AND deleted_at IS NULL
                LIMIT 1
                `,
                [
                    rentalId
                ]
            );
        
        return result[0] ?? null;

    };

    public static async updateStatus(
        data: TypedBody<UpdatePaymentRequest> & {
            id: number
        }
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            UPDATE payments
            SET
                status = ?,
                payment_date = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                data.status,
                data.payment_date ?? null,
                data.id
            ]
        );

    };

    public static async markAsPaid(
        id: number
    ): Promise<void> {

        return this.updateStatus({
            id,
            status: PaymentStatus.PAID,
            payment_date: new Date()
        });

    };

    public static async markAsFailed(
        id: number
    ): Promise<void> {

        return this.updateStatus({
            id,
            status: PaymentStatus.FAILED
        });

    };

    public static async refund(
        id: number
    ): Promise<void> {

        return this.updateStatus({
            id,
            status: PaymentStatus.REFUNDED
        });

    };

    public static async delete(
        id: number
    ): Promise<void> {

        const executor = getExecutor();

        await executor.query(
            `
            UPDATE payments
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