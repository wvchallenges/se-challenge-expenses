CREATE database expenses;
CREATE USER 'expenses_user'@'localhost' IDENTIFIED BY 'expenses_pass';
GRANT ALL PRIVILEGES ON expenses.* TO 'expenses_user'@'localhost';
