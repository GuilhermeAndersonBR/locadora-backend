import { RowDataPacket } from "mysql2";

import PaymentMethod from "@locadora/shared/payment/types/payment-method.type.js";
import PaymentStatus from "@locadora/shared/payment/types/payment-status.type.js";
export interface PaymentRow extends RowDataPacket {
    
    id: number;

    amount: number;

    payment_method: PaymentMethod;

    status: PaymentStatus;

    payment_date: Date | null;

    rental_id: number;

    created_at: Date;

    updated_at: Date;

    deleted_at: Date | null;

};