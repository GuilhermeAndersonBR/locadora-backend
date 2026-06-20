import { Express } from "express";
import RouteRegistry from "../registry/route.registry.js";
import ControllerRegistry from "../registry/controller.registry.js";
import ModuleRegistry from "../registry/module.registry.js";
import { wrap } from "./wrap-handler.js";
import { errorHandler } from "../middleware/error-handle.middleware.js";
import Path from "../routes/path.js";
import Log from "../messages/log.js";
import { languageMiddleware } from "../middleware/language.middleware.js";

export async function bootstrapRoutes(app: Express): Promise<void> {

    await ModuleRegistry.load();

    const routes = RouteRegistry.getAll();

    routes.forEach(route => {

        const { path, controller, handler, method, middlewares  } = route;

        Log.info(
            "Instancing controller: {0}",
            controller.name
        );

        const instance = ControllerRegistry.get(controller);

        if(!instance) return;

        const handlerBind = handler.bind(instance);

        const completePath = 
            `${instance.constructor.__path__}${path}`;

        Log.info(
            "Defining route: {0}",
            completePath
        );

        app[method](
            completePath, 
            languageMiddleware,
            ...middlewares,
            wrap(handlerBind)
        );
        
    });

    app.use(errorHandler);

};