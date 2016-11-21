DROP OWNED BY expense CASCADE;
DROP ROLE IF EXISTS expense;

CREATE ROLE expense WITH LOGIN PASSWORD '3xp3nse';

CREATE SCHEMA AUTHORIZATION expense

-- *******************************************************************
-- General comment: Although educated on traditional (real) PK model I
-- later became a big fan of pure surrogate key model which is what I
-- have been using for over a decade and has proven time and again to
-- be the most flexible and maintainable RDBMS modeling style in my
-- experience to date.
-- *******************************************************************

-- assumed the data was exported from another system so
-- lastname+firstname should not repeat

CREATE TABLE employee (
       id serial,
       lastname text,
       firstname text,
       address text,
       created timestamp with time zone default (now() at time zone 'utc'),
       PRIMARY KEY (id))
CREATE UNIQUE INDEX employee_names_idx ON employee (lastname, firstname)

CREATE TABLE tax (
       id serial,
       name text,
       rate decimal(5,3),
       PRIMARY KEY (id))
CREATE INDEX tax_name_idx ON tax (name)

CREATE TABLE expense_category (
       id serial,
       name text,
       PRIMARY KEY (id))
CREATE INDEX expense_name_idx ON expense_category (name)

CREATE TABLE expense_report (
       id serial,
       description text,
       file text,
       loaded_by text,
       created timestamp with time zone default (now() at time zone 'utc'),
       PRIMARY KEY (id))

-- Not a big fan of calculated fields in the database, but here
-- are two cases where they are actually desirable: (a) tax_amount is
-- necessary because tax rates may change over time so tax amount must
-- be stored historically. (b) expense_total: is not necessary but
-- since this is non-mutating historic data, having the pre-calculated
-- total is convenient both for query simplification and performance.

CREATE TABLE expense_line (
       id serial,
       expense_report_id integer REFERENCES expense_report (id),
       employee_id integer REFERENCES employee(id),
       expense_category_id integer REFERENCES expense_category(id),
       description text,
       amount decimal(10,2),
       tax_id integer REFERENCES tax(id),
       tax_amount decimal(10,2),
       date date,
       total decimal(10,2),
       PRIMARY KEY (id));

