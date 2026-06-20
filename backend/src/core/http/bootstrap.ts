import { Express } from "express";
import { bootstrapRoutes } from "./bootstrap-routes.js";
import Log from "../messages/log.js";
import logMessage from "../../../data/logMessage.json" with { type: "json"};

export async function bootstrap(app: Express): Promise<void> {

    Log.info(
        logMessage.GENERIC_LOG,
        "Starting API..."
    );

    await bootstrapRoutes(app);

    Log.info(
        logMessage.GENERIC_LOG,
        "API started!"
    );

};

// Carmen Freitas
// Maria do Carmo Ribeiro