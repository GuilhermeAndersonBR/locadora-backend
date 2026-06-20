import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import CategoryService from "../service/category.service.js";
import { CreateCategoryDTO } from "../dto/create-category.dto.js";

@Controller("/category")
export default class CategoryController {
    
    public constructor(
        private readonly service = new CategoryService()
    ) {};

    @Route("/all", Method.GET, [])
    public async getAll(
        _request: Request, 
        response: Response
    ): Promise<Response> {

        return HTTPResponse.ok(
            response,
            "CATEGORIES_FOUND_SUCCESSFULLY",
            {}
        );

    };

    @Route("/create", Method.POST, [])
    public async create(
        request: Request, 
        response: Response
    ): Promise<Response> {

        console.log(request.language);

        const { 
            name, 
            description 
        } = request.body as CreateCategoryDTO;

        await this.service.create({
            name,
            description
        });

        return HTTPResponse.ok(
            response,
            "CATEGORY_CREATED_SUCCESSFULLY",
            {}
        );

    };

};