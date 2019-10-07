CSVConverter 0.1.0
==============

Description
--------------

Web based application accepting via a form comma separated file
with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.


After upload, application processes the file, stores data in in-memory relational database
and displays a table of the total expenses amount per-month represented by the uploaded file.


The following assumptions are taken:


i.   Columns will always be in that order.

ii.  There will always be data in each column.

iii. There will always be a header line.


*Notes:*

*The application allows parallel processing of the files.*

*The data stored in the in-memory database is discarded after the application terminates.*

*The records in the uploaded files are not uniquely identified and are not de-duplicated in the database. This may cause accumulation of the monthly expenses returned by the application when multiple uploads of the same or overlapping data are performed.*

*The previously uploaded copies of the files are cleaned up when application starts.*


Build and run instructions
---------------------------

To **build** the application you will need

JDK 1.8 or later.

Maven 3.0+.


To build the application execute:

**mvn clean install**

To create a stand alone application package run:

**mvn package**

(the build JAR file will be located in the target directory.)


Both commands must be executed from the root application directory where *pom.xml* file resides.


To **run** the application you must have

Java 1.8 or later.

The application requires write access to the local directory.


To run with Maven execute:

**mvn spring-boot:run**

from the root application directory.


Alternatively to run the pre-packaged JAR file execute:

**java -jar <path>/csvconverter-0.1.0.jar**


No preliminary steps are necessary to run the application.

Once launched it can be access with you web browser (tested with Firefox and Safari) under the following URI:

**http://localhost:8080**


The application can be terminated from the command line by sending SIGTERM signal with CTRL+C.


Implementation notes
----------------------

I have completed the application within couple of nights and enjoyed every step of its development. I was particularly happy to put hands on Spring Batch projects - something I was planning to do for a while bug have not had a good reason to do it. I believe with Spring Batch and Spring Boot we can quickly build well structured applications separating different concerns and leveraging best OO practices.

My TODOs for the next version would include improved error handling, better Unit Test coverage and separation of data between different
web session contexts.
