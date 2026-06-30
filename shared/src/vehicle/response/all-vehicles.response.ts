import z from "zod";
import VehicleStatus from "../types/vehicle-status.type.js";
import { GetVehicleResponseSchema } from "./get-vehicle.response.js";

export const AllVehiclesResponseSchema = z.array(
    GetVehicleResponseSchema
);

export type AllVehiclesResponse = z.infer<
    typeof AllVehiclesResponseSchema
>;