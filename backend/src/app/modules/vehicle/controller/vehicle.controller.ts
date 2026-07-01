import { Request, Response } from "express";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import { TypedFileRequest, TypedRequest } from "../../../../core/types/typed-request.type.js";
import VehicleService from "../service/vehicle.service.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";
import Role from "../../../../../../shared/src/user/types/user-role.type.js";
import { CreateVehicleRequest, CreateVehicleRequestSchema } from "@locadora/shared/vehicle/request/create-vehicle.schema.js";
import { UpdateVehicleRequest, UpdateVehicleRequestSchema } from "@locadora/shared/vehicle/request/update-vehicle.schema.js";
import { uploadMiddleware } from "../../../../core/middleware/upload.middleware.js";
import Transaction from "../../../../core/decorators/transaction.decorator.js";

@Controller('/vehicle')
export default class VehicleController {

    @Route("/", Method.GET, [])
    public async getAll(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await VehicleService.getAll();

        return HTTPResponse.ok(
            response,
            "VEHICLES_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.GET, [])
    public async getById(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const { id } = request.params;

        const data = await VehicleService.findById(
            Number(id)
        );

        return HTTPResponse.ok(
            response,
            "VEHICLE_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/", Method.POST, [
        authGuard,
        roleGuard(Role.ADMIN),
        uploadMiddleware("file")
    ])
    @BodySchema(CreateVehicleRequestSchema)
    @Transaction()
    public async create(
        request: TypedFileRequest<CreateVehicleRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await VehicleService.create({
            ...request.body,
            file: request.file
        });

        return HTTPResponse.ok(
            response,
            "VEHICLE_CREATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.PUT, [
        authGuard,
        roleGuard(Role.ADMIN),
        uploadMiddleware("file")  
    ])
    @BodySchema(UpdateVehicleRequestSchema)
    public async update(
        request: TypedFileRequest<UpdateVehicleRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await VehicleService.update({
            ...request.body,
            id: Number(request.params.id),
            file: request.file
        });

        return HTTPResponse.ok(
            response,
            "VEHICLE_UPDATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.DELETE, [
        authGuard,
        roleGuard(Role.ADMIN)    
    ])
    public async delete(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await VehicleService.delete(
            Number(request.params.id)
        );

        return HTTPResponse.ok(
            response,
            "VEHICLE_DELETED_SUCCESSFULLY",
            data
        );

    };

};