The Solution is based on .Net Framework and need a machine with .Net Framework 4.5.2 or latest installed with IIS Server
Alternatively the solution can be deployed on Microsoft Azure Cloud Platform
There is a free trial subscipiton available for Azure, which can be used to deploy and run

The Solution Design/Architecture:
--------------------
The solution is designed keeping performance, scalability and modularity in mind
The architecture ensures that the solution is capable of vertical and horizontal scaling and gives maximum performance
on the resources available.
The solution is loosely coupled, is real time, responsive and modular.
Security aspect has not been addressed as of now, but is work in progress as it is an important aspect of any software development

How the Framework Works:
-----------------------
1. From the Web FrontEnd a user selects an Expense CSV File as given in sample and click on upload
2. The Web frontend establishes a connection with the REST API Backend and posts the file
3. The Web API receives the file, validates it, creates an object model and post it in a queue, while simultaneously relaying
status to the caller (Using SignalR)
4. Once the post is successfull the request is complete and an status is shown to the user.
5. A Job which is listening to the Queue picks up the message, deserializes and and starts processing
6. The Job processes the expense parallely using multiple therad to speed up the processing and database entry
7. The Job also sends real time progress to the Web Front End using SignalR
8. The user is receiving realtime feedback
9. Once the data migration is complete a Completed status is showin to user and the
summary of upload which is total expence by month uploaded in the file.

What I am proud of:
-------------------
I love design and designing for performance and scalibility is my passion.
From overall architecture perspective this solution is Realtime, scalable and delivers high performance
From Lowlevel Solution design, object Oriented principle, Dependency Injection is used, which makes changes very easy
From Web Front End, I have used Knockout Framework which is very lightweight modular framework
SignalR - for ReaTime communication
Bootstrap for responsive design

Work In Progress: 
------------------
Authentication, Authorization and overall Security (Threat Modelling)
File Validation and CSV Parser needs to be developed
Unit Test - Planning to use  XUnit and I always aim for 100% test coverage

Bug: 
Please remove any extra comma from the csv data such as in Ammount Column
I have included a csv file in the solution please use that, I have removed sich extra comma from it.
The framework does not take such comma into consideration and assumes after every comma is a new column

Solution Structure:
-------------------
The Solution opens in Visual Studio 2015 and is composed of following components:
1. Wave.EmployeeMigration.UI ( The HTML/JS frontend)
2. Wave.EmployeeMigration.API ( The REST API)
3. Wave.JobProcessing (The Job Processor)
4. Database(SQl Server Database Component)
5. ServiceBus (An On Premise/Could based Microsoft Service Bus Queue)
6. Storage (Azure Job Storage)

To Set Up:
----------
1. Please run the Database deployment script first in an on premise sql server or cloud sql server
the database script is included in the solution.
once created, please update the connection string int the Wave.JobProcessing Project Appconfig file
Alternatively, leave the connection string in the project intact, It has my Azure SQl Credential. You can use it

2. SetUp a Service Bus Queue
on Microsof Azure Portal, create a service Bus Namespace and update the connection string
in Job processor and API project. The solution will automatically create the Queue
Alternatively skip this step and leave the Service Bus connection string intact, It will use 
my Azure Service Bus credential I created for this project.

3. Setup an Azure Storage Account
On Microsoft Azure Portal Create a Storage account or skip this step and leave this storage endpoint intact 
which is using my storage credential I created specifically for this project.

4. Deploy the Web Job on either your Azure Account or Run it locally as it listens to Service Bus Queue and connects
to the DB and needs storage, created in Step 1,2,3 
If you skipped Step 1,2,3 you can still run it locally from Visual Studio and see it capturing request and processing it.
Or you can Just Skip it, as I have already deployed a Web Job that Listens to ServiceBus and that will process the request

5. Deploy the Web API
Either Deploy on Cloud or Run Locally on IIS or from Visual Studio Directly (IIS Express)
A Web API is already deployed on my Azure Account, link below:
http://waveempmigrationapi.azurewebsites.net/

6. If you have chosen to deploy Web API then grab the endpoin and update the endpoint in constants.js file in the UI
project.

7. Deploy and Run the UI project or hit the following deployed URL and get the experience
http://waveemployeemigration.azurewebsites.net/




