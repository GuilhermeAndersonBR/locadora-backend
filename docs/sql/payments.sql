CREATE TABLE payments (
    id INT(11) NOT NULL AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM(
        'CASH',
        'CREDIT_CARD',
        'DEBIT_CARD',
        'PIX'
    ) NOT NULL,
    status ENUM(
        'PENDING',
        'PAID',
        'FAILED',
        'REFUNDED'
    ) NOT NULL DEFAULT 'PENDING',
    payment_date DATETIME NULL,
    rental_id INT(11) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL DEFAULT NULL
);