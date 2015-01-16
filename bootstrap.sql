CREATE TABLE employees (
  employee_id      integer        PRIMARY KEY,
  name             varchar(75),
  address          varchar(255)
);

CREATE TABLE categories (
  category_id      integer        PRIMARY KEY,
  name             varchar(255)
);

CREATE TABLE taxes (
  tax_id        integer           PRIMARY KEY,
  name          varchar(75)
);

CREATE TABLE expenses (
  expense_id                        integer           PRIMARY KEY,
  category_id                       integer,
  employee_id                       integer,
  date                              date,
  "expense description"             varchar(255),
  tax_id                            integer,
  "pre-tax amount"                  numeric(10, 2),
  "tax amount"                      numeric(10, 2)
);
