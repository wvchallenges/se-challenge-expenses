BEGIN;

CREATE DATABASE wave_db_dev;

USE wave_db_dev;

CREATE TABLE expense
(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
date DATE NOT NULL,
category VARCHAR(50) NOT NULL,
employee_name VARCHAR(50) NOT NULL,
employee_address VARCHAR(50) NOT NULL,
expense_description VARCHAR(50) NOT NULL,
pre_tax_amount FLOAT NOT NULL,
tax_name VARCHAR(50) NOT NULL,
tax_amount FLOAT NOT NULL
);

COMMIT;