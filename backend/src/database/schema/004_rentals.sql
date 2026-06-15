CREATE TABLE rentals (
    id INT PRIMARY KEY AUTO_INCREMENT,

    start_date DATETIME NOT NULL,
    expected_return_date DATETIME NOT NULL,
    return_date DATETIME NULL,

    total_value DECIMAL(10,2) NULL,
    status ENUM('ACTIVE', 'FINISHED', 'LATE', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',

    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);