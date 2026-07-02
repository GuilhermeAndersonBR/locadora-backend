CREATE TABLE rentals (
    id INT(11) NOT NULL AUTO_INCREMENT,
    start_date DATETIME NOT NULL,
    expected_return_date DATETIME NOT NULL,
    return_date DATETIME NULL,
    daily_price_cents INT(11) NOT NULL,
    total_price_cents INT(11) NOT NULL,
    status ENUM(
        'ACTIVE',
        'FINISHED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'ACTIVE',
    user_id INT(11) NOT NULL,
    vehicle_id INT(11) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);