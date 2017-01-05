DROP TABLE employee_expenses IF EXISTS;

CREATE TABLE employee_expenses  (
    employee_tax_id BIGINT IDENTITY NOT NULL PRIMARY KEY,
    expense_date DATE,
    category VARCHAR(32),
    employee_name VARCHAR(64),
    employee_address VARCHAR(128),
    expense_description VARCHAR(128),
    pretax_amount VARCHAR(20),
    tax_name VARCHAR(20),
    tax_amount VARCHAR(20)
);