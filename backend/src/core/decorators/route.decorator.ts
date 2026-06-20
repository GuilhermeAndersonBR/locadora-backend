import Methods from "../enums/method.enum.js";
import { MiddlewareHandler } from "../types/middleware-handler.type.js";
import RouteRegistry from "../registry/route.registry.js";
import Path from "../routes/path.js";
import Log from "../messages/log.js";
import logMessage from "../../../data/logMessage.json" with { type: "json"};

export default function Route(
    path: string, 
    method: Methods, 
    middlewares: Array<MiddlewareHandler> = []
): Function {
    
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): void => {

        path = new Path(path).value;

        Log.info(
            logMessage.MODIFYING_ROUTE,
            path
        );

        RouteRegistry.register({
            path,
            method,
            middlewares,
            handler: descriptor.value,
            propertyKey,
            controller: target.constructor
        });

    };

};