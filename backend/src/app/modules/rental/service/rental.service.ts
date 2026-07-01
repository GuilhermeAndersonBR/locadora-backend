import ConflictError from "../../../../core/errors/conflict.error.js";
import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import UserRepository from "../../user/repository/user.repository.js";
import VehicleRepository from "../../vehicle/repository/vehicle.repository.js";
import VehicleStatus from "@locadora/shared/vehicle/types/vehicle-status.type.js";
import RentalCalc from "../calc/rental.calc.js";
import RentalPolicy from "../policy/rental.policy.js";
import RentalRepository from "../repository/rental.repository.js";
import { CreateRentalRequest } from "@locadora/shared/rental/request/create-rental.request.js";
import { GetAllRentalResponse } from "@locadora/shared/rental/response/get-all-rental.response.js";

export default abstract class RentalService {

    public static async getAll(

    ): Promise<GetAllRentalResponse> {

        const rentals = await RentalRepository.getAll();

        const vehicles = await Promise.all(rentals.map(
            async rental => await VehicleRepository.findByRentalId(
                rental.id
            )
        ));

        const data: GetAllRentalResponse = 
            rentals.map((rental, index) => ({
                id: rental.id,
                start_date: rental.start_date.toISOString(),
                expected_return_date: rental.expected_return_date.toISOString(),
                return_date: rental.return_date?.toISOString(),
                daily_price_cents: rental.daily_price_cents,
                total_price_cents: rental.total_price_cents,
                status: rental.status,
                vehicle: {
                    id: vehicles[index]!.id,
                    plate: vehicles[index]!.plate,
                    brand: vehicles[index]!.brand,
                    model: vehicles[index]!.model
                }
            }));

        return data;

    };

    public static async getAllById(
        id: number
    ): Promise<GetAllRentalResponse> {

        const rentals = 
            await RentalRepository.getAllById(
                id
            );

        const vehicles = await Promise.all(rentals.map(
            async rental => await VehicleRepository.findByRentalId(
                rental.id
            )
        ));

        const data: GetAllRentalResponse = 
            rentals.map((rental, index) => ({
                id: rental.id,
                start_date: rental.start_date.toISOString(),
                expected_return_date: rental.expected_return_date.toISOString(),
                return_date: rental.return_date?.toISOString(),
                daily_price_cents: rental.daily_price_cents,
                total_price_cents: rental.total_price_cents,
                status: rental.status,
                vehicle: {
                    id: vehicles[index]!.id,
                    plate: vehicles[index]!.plate,
                    brand: vehicles[index]!.brand,
                    model: vehicles[index]!.model
                }
            }));

        return data;

    };

    public static async create(
        data: TypedBody<CreateRentalRequest>
    ): Promise<Record<string, any>> {

        const user = await UserRepository.getById(
            data.user_id
        );

        if(!user)
            throw new NotFoundError(
                "USER_NOT_FOUND"
            );

        const vehicle = await VehicleRepository.findById(
            data.vehicle_id
        );

        if(!vehicle)
            throw new NotFoundError(
                "VEHICLE_NOT_FOUND"
            );

        if(
            vehicle.status !== VehicleStatus.AVAILABLE
        ) throw new ConflictError(
            "VEHICLE_ALREADY_RENTED"
        );

        const alreadyRented = 
            await RentalRepository.hasActiveRental(
                vehicle.id
            );
        
        if(alreadyRented)
            throw new ConflictError(
                "VEHICLE_ALREADY_RENTED"
            );
        
        if(
            data.expected_return_date <= 
            data.start_date
        ) throw new ConflictError(
            "INVALID_RENTAL_PERIOD"
        );

        const totalDailyPriceCents = 
            RentalCalc.calculate(
                data.start_date,
                data.expected_return_date,
                vehicle.daily_rate
            );

        const rentalId = await RentalRepository.create({
            ...data,
            daily_price_cents: vehicle.daily_rate,
            total_price_cents: totalDailyPriceCents,
        });

        await VehicleRepository.update({
            id: vehicle.id,
            status: VehicleStatus.RENTED
        });

        return {
            id: rentalId
        };

    };

    public static async finish(
        id: number
    ): Promise<Record<string, any>> {

        const rental = await RentalRepository.findById(
            id
        );

        if(!rental)
            throw new NotFoundError(
                "RENTAL_NOT_FOUND"
            );

        RentalPolicy.canFinish(rental);

        const totalDailyPriceCents = 
            RentalCalc.calculate(
                rental.start_date,
                new Date(),
                rental.daily_price_cents
            );
        
        await RentalRepository.finish(
            id,
            totalDailyPriceCents
        );
        
        await VehicleRepository.update({
            id: rental.vehicle_id,
            status: VehicleStatus.AVAILABLE
        });

        return {
            id: rental.id
        };

    };

    public static async cancel(
        id: number
    ): Promise<Record<string, any>> {

        const rental = await RentalRepository.findById(
            id
        );

        if(!rental)
            throw new NotFoundError(
                "RENTAL_NOT_FOUND"
            );

        RentalPolicy.canCancel(rental);

        await RentalRepository.cancel(
            id
        );

        await VehicleRepository.update({
            id: rental.vehicle_id,
            status: VehicleStatus.AVAILABLE
        });

        return {
            id: rental.id
        };

    };

};