import { Request, Response } from "express";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import CreateVehicleSchema from "../schema/create-vehicle.schema.js";
import VehicleService from "../service/vehicle.service.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";
import Role from "../../user/types/role.type.js";
import UpdateVehicleSchema from "../schema/update-vehicle.schema.js";

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
        // authGuard,
        // roleGuard(Role.ADMIN)
    ])
    @BodySchema(CreateVehicleSchema)
    public async create(
        request: TypedRequest<typeof CreateVehicleSchema>, 
        response: Response
    ): Promise<Response> {

        const data = await VehicleService.create(
            request.body
        );

        return HTTPResponse.ok(
            response,
            "VEHICLE_CREATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.PUT, [
        authGuard,
        roleGuard(Role.ADMIN)  
    ])
    @BodySchema(UpdateVehicleSchema)
    public static async update(
        request: TypedRequest<typeof UpdateVehicleSchema>, 
        response: Response
    ): Promise<Response> {

        const data = await VehicleService.update({
            ...request.body,
            id: Number(request.params.id)
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