*** Installation Instructions

Assuming Python is installed ...
1. 'pip install -r requirements.txt'.  This downloads Django.
2. Inside the 'wavese' directory ... type 'python manage.py migrate'.  This sets up the initial database tables.
3. Inside the 'wavese' directory ... type 'python manage.py loaddata endToEndTest.yaml'.  This initializes the 
   expense_csvsource table with a record with id=1.  

The Django built-in development server was used to test this.  This can be started with by typing 
'python manage.py runserver' in the wavese directory.  The Web form that handles CSV uploads can be accessed through 
"127.0.0.1:8080".

To test uploads out-of-the-box, provide "1" as the CSV source id.


*** Solution Description

Since I am more experienced in back-end development than front-end, I focused my efforts on my back-end experience and 
kept the HTML very basic and 1999-like.
  
In addition to domain model and normalized database design for the expense records, I added extra models which 
facilitate multitenancy and provide extra bookkeeping features.  These extra models are associated one-to-one with each 
domain object created.

1. CSVSource - This allows each record created to know where it came from.  Two separate sources may have an object 
with the exact description (eg - Two companies may have a Tax object "NY Sales Tax"), and it is unclear if they should 
be the same record in the database.  If record consildation is needed in the future, it can be done without affecting 
other sources.
2. Job - I am familiar with and believe in the Spring Batch framework, so I implemented a subset of its domain model 
(ItemReader, ItemProcessor, ItemWriter, JobExecutionListener, JobParameter).  Every time a new CSV comes in, a new Job 
object and id is created.  When displaying expenses by month, the job id makes it easy to consider only the records in 
the CSV and no more.  As a result the code is more resilient to change; no custom Python code is needed for 
aggregation, and I can delegate that to the database and a single query.

The other nice thing about this solution is that it lends itself well to handling large files because it is 
conservative in memory consumption.

1. Django does not put large uploads in memory.  I mention this only because Django does put small uploads into memory.
2. The CSV is processed a few rows at a time, so it only stores a few records in memory at a time.
3. When writing a batch of records to a database, the entire batch is processed in one shot.