const PaymentStatus = {
    PENDING: "PENDING",
    PAID: "PAID",
    FAILED: "FAILED",
    REFUNDED: "REFUNDED"
} as const;

type PaymentStatus = typeof PaymentStatus[
    keyof typeof PaymentStatus
];

export default PaymentStatus;