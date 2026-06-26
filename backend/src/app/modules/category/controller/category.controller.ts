import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import { authGuard } from "../../../guard/auth.guard.js";
import roleGuard from "../../../guard/role.guard.js";
import Role from "../../user/types/role.type.js";
import { TypedRequest } from "../../../../core/types/typed-request.type.js";
import CreateCategorySchema from "../schema/create-category.schema.js";
import CategoryService from "../service/category.service.js";

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

    @Route("/", Method.POST, [
        authGuard,
        roleGuard(Role.ADMIN)
    ])
    public async create(
        request: TypedRequest<typeof CreateCategorySchema>, 
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
        roleGuard(Role.ADMIN)
    ])
    public async update(
        request: TypedRequest<typeof CreateCategorySchema>, 
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
        roleGuard(Role.ADMIN)
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