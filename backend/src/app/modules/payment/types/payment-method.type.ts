const PaymentMethod = {
    CASH: "CASH",
    CREDIT_CARD: "CREDIT_CARD",
    DEBIT_CARD: "DEBIT_CARD",
    PIX: "PIX"
} as const;

type PaymentMethod = typeof PaymentMethod[
    keyof typeof PaymentMethod
];

export default PaymentMethod;