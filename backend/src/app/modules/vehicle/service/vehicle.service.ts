import ConflictError from "../../../../core/errors/conflict.error.js";
import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TypedBody } from "../../../../core/types/typed-body.type.js";
import CategoryRepository from "../../category/repository/category.repository.js";
import VehicleRepository from "../repository/vehicle.repository.js";

import CreateVehicleSchema from "@locadora/shared/vehicle/schema/create-vehicle.schema.js";
import UpdateVehicleSchema from "@locadora/shared/vehicle/schema/update-vehicle.schema.js";

export default abstract class VehicleService {

    public static async getAll(

    ): Promise<Record<string, any>> {

        const vehicles = await VehicleRepository.getAll();

        return vehicles;

    };

    public static async findById(
        id: number
    ): Promise<Record<string, any>> {

        const vehicle = await VehicleRepository.findById(
            id
        );

        if(!vehicle)
            throw new NotFoundError(
                "VEHICLE_NOT_FOUND"
            );

        return {
            id: vehicle.id,
            plate: vehicle.plate,
            category: vehicle.category,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            daily_rate: vehicle.daily_rate,
            status: vehicle.status
        };

    };

    public static async create(
        data: TypedBody<typeof CreateVehicleSchema>
    ): Promise<Record<string, any>> {

        const vehicleFindByPlate = 
            await VehicleRepository.findByPlate(
                data.plate
            );

        if(vehicleFindByPlate)
            throw new ConflictError(
                "VEHICLE_PLATE_ALREADY_EXISTS"
            );

        const category = await CategoryRepository.findById(
            data.category_id
        );

        if(!category)
            throw new ConflictError(
                "CATEGORY_NOT_FOUND"
            );
        
        const vehicleId = await VehicleRepository.create(
            data
        );

        return {
            id: vehicleId
        };

    };

    public static async update(
        data: TypedBody<typeof UpdateVehicleSchema> & {
            id: number
        }
    ): Promise<Record<string, any>> {

        const vehicle = await VehicleRepository.findById(
            data.id
        );

        if(!vehicle)
            throw new NotFoundError(
                "VEHICLE_NOT_FOUND"
            );

        if(
            data.category_id && 
            !await VehicleRepository.findById(
                data.category_id
            )
        ) throw new ConflictError(
            "CATEGORY_NOT_FOUND"
        );

        await VehicleRepository.update(
            data
        );

        return {};

    };

    public static async delete(
        id: number
    ): Promise<Record<string, any>> {

        await VehicleRepository.delete(
            id
        );

        return {};

    };

};