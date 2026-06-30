import { CreateVehicleRequest } from "@locadora/shared/vehicle/request/create-vehicle.schema.js";
import ConflictError from "../../../../core/errors/conflict.error.js";
import NotFoundError from "../../../../core/errors/not-found.error.js";
import { TypedBody, TypedFileBody } from "../../../../core/types/typed-body.type.js";
import CategoryRepository from "../../category/repository/category.repository.js";
import VehicleRepository from "../repository/vehicle.repository.js";
import { UpdateVehicleRequest } from "@locadora/shared/vehicle/request/update-vehicle.schema.js";
import VehicleStatus from "@locadora/shared/vehicle/types/vehicle-status.type.js";
import ImageService from "../../image/service/image.service.js";
import ImageEntityType from "@locadora/shared/image/types/image-entity.type.js";
import ImageProcessor from "../../../../core/services/image/image-processor.service.js";
import { AllVehiclesResponse } from "@locadora/shared/vehicle/response/all-vehicles.response.js";
import { GetVehicleResponse } from "@locadora/shared/vehicle/response/get-vehicle.response.js";

export default abstract class VehicleService {

    public static async getAll(

    ): Promise<AllVehiclesResponse> {

        const vehicles = await VehicleRepository.getAll();

        return vehicles;

    };

    public static async findById(
        id: number
    ): Promise<GetVehicleResponse> {

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
            category_id: vehicle.category_id,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            daily_rate: vehicle.daily_rate,
            status: vehicle.status
        };

    };

    public static async create(
        data: TypedFileBody<CreateVehicleRequest>
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
        
        const vehicleId = await VehicleRepository.create({
            ...data,
            status: VehicleStatus.AVAILABLE
        });

        await ImageService.upload({
            entity_id: vehicleId,
            entity_type: ImageEntityType.VEHICLE,
            file: data.file,
            processors: [
                {
                    name: "avatar",
                    processor: ImageProcessor.original
                }
            ]
        });

        return {
            id: vehicleId
        };

    };

    public static async update(
        data: TypedFileBody<UpdateVehicleRequest> & {
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
            !await CategoryRepository.findById(
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