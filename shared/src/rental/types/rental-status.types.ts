const RentalStatus = {
    ACTIVE: "ACTIVE",
    FINISHED: "FINISHED",
    CANCELLED: "CANCELLED"
} as const;

type RentalStatus = typeof RentalStatus[
    keyof typeof RentalStatus
];

export default RentalStatus;