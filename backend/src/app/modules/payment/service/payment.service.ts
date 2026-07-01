import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import RentalRepository from "../../rental/repository/rental.repository.js";
import PaymentRepository from "../repository/payment.repository.js";
import PaymentStatus from "@locadora/shared/payment/types/payment-status.type.js";
import { GetAllPaymentResponse } from "@locadora/shared/payment/response/get-all-payment.response.js";
import { CreatePaymentRequest } from "@locadora/shared/payment/request/create-payment.request.js";
import VehicleRepository from "../../vehicle/repository/vehicle.repository.js";
import UserRepository from "../../user/repository/user.repository.js";

export default abstract class PaymentService {

    public static async getAll(

    ): Promise<GetAllPaymentResponse> {
        
        const payments = await PaymentRepository.getAll();

        const data: GetAllPaymentResponse =await Promise.all(payments.map(
            
            async payment => {

                return {
                    id: payment.id,
                    amount: payment.amount,
                    payment_method: payment.payment_method,
                    status: payment.status,
                    payment_date: payment.payment_date?.toISOString(),
                    vehicle: (await VehicleRepository.findByRentalId(
                        payment.rental_id
                    ))!,
                    rental_id: payment.rental_id,
                    user: await (async () => {
                        const rental = (await RentalRepository.getById(
                            payment.rental_id 
                        ))!;

                        const user = (await UserRepository.getById(
                            rental.user_id
                        ))!;

                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        };
                    })(),
                    created_at: payment.created_at.toISOString()

                };

            }
            
        ));

        return data;

    };

    public static async getAllByUserId(
        userId: number
    ): Promise<GetAllPaymentResponse> {
        
        const payments = await PaymentRepository.getAllByUserId(
            userId
        );

        const data: GetAllPaymentResponse = await Promise.all(payments.map(
            
            async payment => {

                return {
                    id: payment.id,
                    amount: payment.amount,
                    payment_method: payment.payment_method,
                    status: payment.status,
                    payment_date: payment.payment_date?.toISOString(),
                    vehicle: (await VehicleRepository.findByRentalId(
                        payment.rental_id
                    ))!,
                    rental_id: payment.rental_id,
                    user: await (async () => {
                        const rental = (await RentalRepository.getById(
                            payment.rental_id 
                        ))!;

                        const user = (await UserRepository.getById(
                            rental.user_id
                        ))!;

                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        };
                    })(),
                    created_at: payment.created_at.toISOString()

                };

            }

        ));

        return data;

    };

    public static async pay(
        data: TypedBody<CreatePaymentRequest>
    ): Promise<Record<string, any>> {

        const rental = await RentalRepository.findById(
            data.rental_id
        );

        if(!rental)
            throw new NotFoundError(
                "RENTAL_NOT_FOUND"
            );
        
        const paymentId = await PaymentRepository.create({
            ...data,
            amount: rental.total_price_cents,
            status: PaymentStatus.PENDING,
            payment_date: new Date()
        });

        await PaymentRepository.markAsPaid(
            paymentId
        );

        return {};

    };

};