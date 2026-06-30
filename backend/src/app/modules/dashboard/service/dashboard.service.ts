import DashboardRepository from "../repository/dashboard.repository.js";

import { DashboardResponse } from "@locadora/shared/dashboard/response/dashboard.response.js";

export default abstract class DashboardService {

    public static async dashboard(

    ): Promise<DashboardResponse> {

        const availableVehicles = 
            await DashboardRepository.availableVehicles();
        
        const vehicleWithMostDailyRate = 
            await DashboardRepository.vehicleWithMostDailyRate();

        const vehiclesByCategory = 
            await DashboardRepository.vehiclesByCategory();

        return {
            availableVehicles,
            highestRateVehicle: vehicleWithMostDailyRate ?? undefined,
            vehiclesByCategory: vehiclesByCategory.map(
                vehicle => ({
                    name: vehicle.name,
                    total: vehicle.total
                })
            )
        }

    }

};