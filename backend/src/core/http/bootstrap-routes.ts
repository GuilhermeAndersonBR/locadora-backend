import { Express } from "express";
import RouteRegistry from "../registry/route.registry.js";
import ControllerRegistry from "../registry/controller.registry.js";
import ModuleRegistry from "../registry/module.registry.js";
import { wrap } from "./wrap-handler.js";
import { errorHandler } from "../middleware/error-handle.middleware.js";

export async function bootstrapRoutes(app: Express): Promise<void> {

    await ModuleRegistry.load();

    const routes = RouteRegistry.getAll();

    routes.forEach(route => {

        const { path, controller, handler, method, middlewares  } = route;

        const instance = ControllerRegistry.get(controller);

        if(!instance) return;

        const handlerBind = handler.bind(instance);

        app[method](
            path, 
            ...middlewares,
            wrap(handlerBind)
        );
        
    });

    app.use(errorHandler);

};