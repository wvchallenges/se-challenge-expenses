Wave Software Development Challenge
===================================

Notes
-----

It has been years since I have done web front end development, and I have never
done it in a greenfield project using free software (my experience was in
modifying and enhancing an ASP.Net project using Visual Studio). After some
failed attempts to ramp up on ASP.Net Core and Angular/Python, I am throwing in
the towel on the web portion of the challenge.

In accordance with the instruction to build the solution with free software in a
way that showcases my strengths, I have built server-side logic and data model
code in straight Java with minimal dependencies, using Eclipse. The relational
DB used is MySql, although in principle any JDBC relational database should work
fine with the code. This persistence and business logic is accessed via a simple
command-line application housed in the executable class
ca.datasports.wavechallenge.Application.

As for what I’m proud of in this work, there is nothing specific that’s part of
the challenge or the solution, but rather a general pride in having invested
care in the design and implementation. I put more time into this than the
guidelines suggested, because it’s code that will have my name attached to it,
and it’s leaving my direct control. It’s important to me that any work product
that ends up representing me is done to my standard. That standard includes:

1.  Constants and enums defined for all special values such as column heading
    names in the file, and field names and parameter indexes for binding
    retrieval and update queries.

2.  Normalization of the data in the data model code. This ensures that the most
    compact and consistent data is written to the DB.

3.  Round-trip DB interaction - the in-memory expense report structure is
    fetched from the DB before processing new input, again to ensure that
    duplication in the DB is avoided wherever possible.

4.  Use of batch insert operations to minimize DB server round-trips. This (in
    combination with the normalization) necessitates generating and
    synchronizing DB ID values in the data model code.

5.  Clear delineation of responsibilities between data model, the reporting
    logic, and the persistence mechanisms for reading from and writing to the
    DB, and parsing the input text.

Note that the code is relatively polished, but is fragile. Any exception thrown
in any part of the processing will bring the whole thing down. If I were to
harden this for production, that is where I would first focus my attention.

My other intent with investing the time to get the code to this condition was to
show my seriousness as an applicant. I hope that that is worth something in your
evaluation.

Load and Build Application
--------------------------

The application was built using Eclipse, and includes 2 projects:

1.  WaveChallengeJava: which includes all code, launchers, and dependent jars.

2.  WaveChallengeResources: which includes the provided sample data file, an
    addition data file created for my own testing, the original README, and the
    DB creation script.

To load and build:

1.  Open Eclipse and import both projects into your Workspace.

2.  Build the WaveChallengeJava project and verify that the Problems tab is
    empty.

3.  Modify the run configrations under the launchers folder so that the
    parameters passed include the DB connection values appropriate for your
    environment (details below).

DB Initialization
-----------------

To initialize the DB, execute the file WaveDB.sql from the
WaveChallengeResources project. I used MySql Workbench.

Verify that the schema wave\_test has been created, and that it includes the
following tables:

1.  employees

2.  expensecategories

3.  expenses

4.  taxnames

Execution Instructions
----------------------

To invoke the application, either update and use one of the provided Run
Configurations in Eclipse, or export an executable JAR and run from the command
line.

The application has 4 mandatory arguments, and one optional. They are as
follows:

1.  verbose: can be true or false. If true, additional logging is written out to
    the console.

2.  dbUrl: address of the running MySql instance.

3.  dbUser: user name for connecting to MySql and writing to the wave\_test DB.

4.  dbPassword: password for the specified user.

5.  filename (optional): a file expected in the same format as the provided
    data\_example.csv file. If not provided, the application will read from
    stdin, compiling the input into a string and passing it to the parser.

To run from the command line, export an executable JAR and run using a command
such as the following:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# using a pipe into stdin
cat data_example2.csv | java -jar WaveChallengeJava.jar false jdbc:mysql://localhost:3306/wave_test wave_user wavey

# using redirection
java -jar WaveChallengeJava.jar false jdbc:mysql://localhost:3306/wave_test wave_user wavey < data_example.csv

# specifying the file on the command line
java -jar WaveChallengeJava.jar false jdbc:mysql://localhost:3306/wave_test wave_user wavey data_example.csv
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note that the normalization applies to Employees, Tax Names, and Expense
Categories. If the application is run multiple times with the same input data,
these items will not be duplicated in the DB. However, Expenses are not
normalized as they are not considered uniquely identifiable from the data in the
provided file (it is possible for one person to have the same type of
expenditure, subject to the same tax, in the same total amount more than once in
day). So running more than once with the same input data will result in
duplicate Expense entries in the DB, and reported in the final monthly
breakdown.
