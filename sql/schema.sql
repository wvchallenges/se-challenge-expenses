drop database if exists se_challenge_expenses;

create database se_challenge_expenses;
use se_challenge_expenses;

create table employee (
    id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar (100) NOT NULL,
    address varchar(255) NOT NULL,
    unique key nm (name)
);

create table accounting (
    id bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
    employeeId int(10) NOT NULL,
    expenditureDate date NOT NULL,
    category varchar(50) NOT NULL,
    description varchar(255) NOT NULL,
    pretax decimal(10,2) NOT NULL,
    taxType varchar(50) NOT NULL,
    taxAmount decimal(10,2) NOT NULL,
    importTime bigint
);