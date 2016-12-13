#!/usr/bin/perl
package DataParser;

use strict;
use warnings;
use DBI;
use Text::CSV;
use HTTP::Server::Simple::CGI;
use base qw(HTTP::Server::Simple::CGI);

sub handle_request {
	my ($self, $cgi) = @_;

	if ($ENV{'REQUEST_METHOD'} eq 'POST') {
		# User has posted a file

		my $csv = Text::CSV->new();
		my $dbh = DBI->connect('dbi:SQLite:expenses.db');

		my $sth = $dbh->prepare('INSERT INTO expenses (
				date,
				category,
				employee_name,
				employee_address,
				expense_description,
				pre_tax_amount,
				tax_name,
				tax_amount
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

		# Hash to store and then compute the summarized expenses
		my %expenses;

		my $expenses_file = $cgi->param('file');
		<$expenses_file>;	# Skip the header

		while (my $row = <$expenses_file>) {

			$csv->parse($row);
			my ($date, $category, $employee_name, $employee_address, $expense_description, $pre_tax_amount, $tax_name, $tax_amount) = $csv->fields();

			my ($month, undef, $year) = split('/', $date);

			# Strip commas from numeric fields and convert to cents for DB only
			for my $amount (\$pre_tax_amount, \$tax_amount) {
				$$amount =~ s/,//g;
				$expenses{$year}{$month} += $$amount;
				$$amount *= 100;
			}

			$sth->execute($date, $category, $employee_name, $employee_address, $expense_description, $pre_tax_amount, $tax_name, $tax_amount);
		}

		$dbh->disconnect();

		print "HTTP/1.0 200 OK\r\n",
			$cgi->header,
			$cgi->start_html(),
			$cgi->p("Total expenses by month:");

		foreach my $year (keys %expenses) {
			foreach my $month (keys $expenses{$year}) {
				printf "$year/%02d: \$%.2f<br>", $month, $expenses{$year}{$month};
			}
		}

		print $cgi->end_html;

	} else {
		print "HTTP/1.0 200 OK\r\n";
		print $cgi->header,
			$cgi->start_html(),
			$cgi->start_form(),
			$cgi->p('Choose a file:'),
			$cgi->filefield('-name' => 'file', '-method' => 'POST'),
			"<br>",
			$cgi->submit(),
			$cgi->end_form(),
			$cgi->end_html();
	}
}

DataParser->new()->run();

1;
