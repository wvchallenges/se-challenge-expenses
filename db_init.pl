#!/usr/bin/perl

use strict;
use warnings;
use DBI;

print('Creating database...');

my $dbh = DBI->connect('dbi:SQLite:expenses.db');

my $sth = $dbh->prepare('CREATE TABLE IF NOT EXISTS expenses (
	date DATE NOT NULL,
	category VARCHAR(255) NOT NULL,
	employee_name VARCHAR(255) NOT NULL,
	employee_address VARCHAR(255) NOT NULL,
	expense_description VARCHAR(255) NOT NULL,
	pre_tax_amount UNSIGNED INT NOT NULL,
	tax_name VARCHAR(255) NOT NULL,
	tax_amount UNSIGNED INT NOT NULL
)');
$sth->execute();
$sth->finish();
$dbh->disconnect();

print("done!\n");

