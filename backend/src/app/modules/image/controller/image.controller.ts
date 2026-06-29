import { Request, Response } from "express";
import Controller from "../../../../core/decorators/controller.decorator.js";
import Route from "../../../../core/decorators/route.decorator.js";
import Method from "../../../../core/enums/method.enum.js";
import HTTPResponse from "../../../../core/http/httpResponse.js";
import ImageService from "../service/image.service.js";

@Controller("/image")
export default class ImageController {

    @Route("/", Method.GET, [])
    public async all(
        request: Request,
        response: Response
    ): Promise<Response> {

        const data = await ImageService.getAll();
        
        return HTTPResponse.ok(
            response,
            "IMAGES_FOUND_SUCCESSFULLY",
            data
        );

    };

};