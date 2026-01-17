/*
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    isEmailConfirmed BOOLEAN NOT NULL,
    verificationToken TEXT,
    resetPasswordToken TEXT,
    isActive BOOLEAN NOT NULL,
    authToken TEXT,
);
*/
