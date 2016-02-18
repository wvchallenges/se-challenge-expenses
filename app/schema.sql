drop table if exists expenses;
create table expenses (
  id integer primary key autoincrement,
  expense_date date not null,
  category text not null,
  employee_name text not null,
  employee_address text not null,
  expense_description text not null,
  tax_name text not null,
  pretax_amount integer not null,
  tax_amount integer not null
);
