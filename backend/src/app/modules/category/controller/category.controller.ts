import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import CategoryService from "../service/category.service.js";
import { BodySchema } from "../../../../core/decorators/body-schema.decorator.js";

import { CreateCategoryRequest, CreateCategoryRequestSchema } from "@locadora/shared/category/request/create-category.request.js";
import UserRole from "@locadora/shared/user/types/user-role.type.js";
import { UpdateCategoryRequest, UpdateCategoryRequestSchema } from "@locadora/shared/category/request/update-category.request.js";

@Controller("/category")
export default class CategoryController {

    @Route("/", Method.GET, [])
    public async getAll(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await CategoryService.getAll();

        return HTTPResponse.ok(
            response,
            "CATEGORIES_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.GET, [])
    public async findById(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await CategoryService.findById(
            Number(request.params.id)
        );

        return HTTPResponse.ok(
            response,
            "CATEGORY_FOUND_SUCCESSFULLY",
            data
        );

    };

    @Route("/", Method.POST, [
        authGuard,
        roleGuard(UserRole.ADMIN)
    ])
    @BodySchema(CreateCategoryRequestSchema)
    public async create(
        request: TypedRequest<CreateCategoryRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await CategoryService.create(
            request.body
        );

        return HTTPResponse.ok(
            response,
            "CATEGORY_CREATED_SUCCESSFULLY",
            data
        );
    
    };

    @Route("/:id", Method.PUT, [
        authGuard,
        roleGuard(UserRole.ADMIN)
    ])
    @BodySchema(UpdateCategoryRequestSchema)
    public async update(
        request: TypedRequest<UpdateCategoryRequest>, 
        response: Response
    ): Promise<Response> {

        const data = await CategoryService.update({
            ...request.body,
            id: Number(request.params.id)
        });

        return HTTPResponse.ok(
            response,
            "CATEGORY_UPDATED_SUCCESSFULLY",
            data
        );

    };

    @Route("/:id", Method.DELETE, [
        authGuard,
        roleGuard(UserRole.ADMIN)
    ])
    public async delete(
        request: Request, 
        response: Response
    ): Promise<Response> {

        const data = await CategoryService.delete(
            Number(request.params.id)
        );

        return HTTPResponse.ok(
            response,
            "CATEGORY_DELETED_SUCCESSFULLY",
            data
        );

    };

};