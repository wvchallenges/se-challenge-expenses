CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  address TEXT
);

CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL REFERENCES employees (id),
  expense_date date,
  category VARCHAR(50),
  description text,
  pre_tax_amount numeric,
  post_tax_amount numeric,
  tax_name VARCHAR(50),
  tax_amount numeric
);