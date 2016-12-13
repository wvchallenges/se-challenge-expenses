# Solution Description
Given that I didn't want to spend a ton of time making something elaborate based on a lot of assumptions or answers from rounds and rounds of questions fired at you, I decided to create a minimul viable solution.  I wanted to produce something that met the requirements; nothing more and nothing less.  Given that, the solution is very simple consisting of a database initialization script, a static web interface, and a handler that parses, stores, and reports on the uploaded data.  I think that the simplity is the strong point of the solution.  It is easy to run, easy to understand, and could be easily refactored and expanded as requirements are added.

# Dependencies
* Perl
* DBI
* Text::CSV
* HTTP::Server::Simple::CGI

All modules are installable via CPAN.  If you've never run CPAN before, you'll need to go through some initial configuration the first time you run it.  After that, you can install by running ``cpan`` and then ``install module::name``.

# How to run

1. Initialize the database by running ``perl db_init.pl``
	* This creates a SQLite database called ``expenses.db`` with one table, ``expenses`` to store all data from the to be uploaded file.
2. Run ``perl server.pl``.
	* Copy the URL printed to the terminal into a web browser.
3. Ctrl-C will kill the server.

Feel free to email me if you have any questions.
