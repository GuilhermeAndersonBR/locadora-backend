const VehicleStatus = {
    AVAILABLE: 'AVAILABLE',
    RENTED: 'RENTED',
    MAINTENANCE: 'MAINTENANCE'
} as const;

type VehicleStatus = 
    typeof VehicleStatus[keyof typeof VehicleStatus];

export default VehicleStatus;