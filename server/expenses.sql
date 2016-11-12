DROP DATABASE IF EXISTS expenses;
CREATE DATABASE expenses;

\c expenses;

CREATE TABLE employees (
  ID SERIAL PRIMARY KEY,
  employee_name VARCHAR,
  employee_address VARCHAR
);

CREATE TABLE categories (
  ID SERIAL PRIMARY KEY,
  category_name VARCHAR
);

CREATE TABLE expenses (
  ID SERIAL PRIMARY KEY,
  date Date,
  employee_id integer REFERENCES employees,
  category_id integer REFERENCES categories,
  expense_description VARCHAR,
  pre_tax_amount DECIMAL,
  tax_name VARCHAR,
  tax_amount DECIMAL
);