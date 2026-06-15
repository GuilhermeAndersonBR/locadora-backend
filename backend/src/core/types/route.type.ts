import Methods from "../enums/method.enum.js";
import { ControllerType } from "./controller.type.js";
import { MiddlewareHandler } from "./middleware-handler.type.js";
import { RouteHandler } from "./route-handler.type.js";

export type Route = {
    path: string;
    method: Methods;
    middlewares: Array<MiddlewareHandler>;
    handler: MiddlewareHandler | RouteHandler;
    propertyKey: string;
    controller: ControllerType;
};