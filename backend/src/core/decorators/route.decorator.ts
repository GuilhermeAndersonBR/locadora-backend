import Methods from "../enums/method.enum.js";
import { MiddlewareHandler } from "../types/middleware-handler.type.js";
import RouteRegistry from "../registry/route.registry.js";
import { wrap } from "../http/wrap-handler.js";
import path from "node:path";
import BaseController from "../http/base.controller.js";

export default function Route(path: string, method: Methods, middlewares: Array<MiddlewareHandler> = []): Function {
    
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {

        const __name__ = target.constructor.__name__;

        path = path.startsWith("\/") ? path : `\/${path}`;

        const formattedPath = `\/${__name__}${path}`;

        RouteRegistry.register({
            path: formattedPath,
            method,
            middlewares,
            handler: descriptor.value,
            propertyKey,
            controller: target.constructor
        });

    };

};