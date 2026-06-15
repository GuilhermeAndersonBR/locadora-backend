import { Express } from "express";
import { bootstrapRoutes } from "./bootstrap-routes.js";

export async function bootstrap(app: Express): Promise<void> {

    await bootstrapRoutes(app);

    console.log("API ready!");

};