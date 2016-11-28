const pg = require('pg');

const connectURL = 'postgres://localhost:5432/expenses';
const client = new pg.Client(connectURL);
client.connect();
const query = client.query(
  'CREATE TABLE IF NOT EXISTS records(id SERIAL PRIMARY KEY, date DATE NOT NULL, category VARCHAR(30) NOT NULL, employee_name VARCHAR(50) NOT NULL, employee_address VARCHAR(100) NOT NULL, expense_description VARCHAR(50) NOT NULL, pre_tax_amount MONEY NOT NULL, tax_name VARCHAR(30) NOT NULL, tax_amount MONEY NOT NULL); CREATE TABLE IF NOT EXISTS temp(id SERIAL PRIMARY KEY, date DATE NOT NULL, category VARCHAR(30) NOT NULL, employee_name VARCHAR(50) NOT NULL, employee_address VARCHAR(100) NOT NULL, expense_description VARCHAR(50) NOT NULL, pre_tax_amount MONEY NOT NULL, tax_name VARCHAR(30) NOT NULL, tax_amount MONEY NOT NULL);');
query.on('end', () => { client.end(); });
