# Create database wavedb
CREATE DATABASE wavedb;

# Create employees table
CREATE TABLE IF NOT EXISTS employees (
  employee_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  address varchar(200) NOT NULL,
  PRIMARY KEY (employee_id),
  UNIQUE KEY name_address (name, address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

# Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  expense_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  employee_id bigint(20) unsigned NOT NULL,
  category varchar(100) NOT NULL,
  description varchar(2000) NOT NULL,
  pre_tax_amount DECIMAL(10,2) NOT NULL,
  tax_name varchar(100) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL,
  expense_date DATE NOT NULL,
  PRIMARY KEY (expense_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;