import UnauthorizedError from "../../../../core/errors/unauthorized.error.js";
import VehicleStatus from "../../vehicle/types/vehicle-status.type.js";
import { VehicleRow } from "../../vehicle/types/vehicle.row.js";
import RentalStatus from "../types/rental-status.types.js";
import { RentalRow } from "../types/rental.row.js";

export default abstract class RentalPolicy {

    public static canCreate(vehicle: VehicleRow): void {

        if (vehicle.status !== VehicleStatus.AVAILABLE)
            throw new UnauthorizedError(
                "VEHICLE_NOT_AVAILABLE"
            );

    };

    public static canFinish(rental: RentalRow): void {

        if (rental.status !== RentalStatus.ACTIVE)
            throw new UnauthorizedError(
                "RENTAL_NOT_ACTIVE"
            );

    };

};