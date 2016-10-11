# Nam Hoang
## Highlights
1. File Upload
    - Use Anti CRSF token. If the internal tool is secured, we can remove this.
    - If the file's size is larger than 256 KB, it will be buffered to disk, rather than held in server memory.
    - The file is read as a stream instead of save to disk then read again.
    - Maximum file size is currently configured to be 100 MB. We can increase it for convenience if there is no security concern (DoS).
2. Parsing & Storing Data
    - Use SQL Bulk Copy instead of many Insert queries, which makes it much faster.
        * The stream of data is bulk copied to the server every 1000 lines. We can change this based on memory/speed requirements, the smaller the number, the less memory is needed to store the lines but it will be slower.
        * SQL Bulk Copy is not vulnerable to SQL Injection.
    - Inconsistent, malformed data can be parsed and applied rules before copying to the database.
        * Currently, I only validate date, pre-tax amount, and tax amount with simple rules.
        * Money amount is currently stored as Decimal(19, 4).
    - Convert from flat file to relational database:
        * Currently, everything is stored in 1 table since the requirement is really simple.
        * Later on, if there are more requirements, we can convert this table into multiple tables with appropriate normalization inside the database.
        * I like this approach more than processing everything while reading the file. It has a few advantages: uploading the file fast, all the processing can be done gradually inside the database.
    - Schema of the relational database if we need to convert it:
        * Employee: Name, Address
        * Expense: Date, Description, Pre-tax Amount, Tax Name, Tax Amount, CategoryId, EmployeeId
        * Expense Category: Name
        * Note:
            + We can have a Tax Category table if Pre-tax Amount, Tax Name, and Tax Amount follow some relationships.
            + Some useful database techniques can be applied: indexing, stored procedures, cascading, etc.
3. Querying data
    - Use a simple SQL query instead of ORM. (https://goo.gl/av4qc1)
    - Can store this query as a stored procedure later if needed.
4. Extra thoughts about a REST API
    - An API is helpful if we need to query the data from different apps.
    - This type of aggregated query (Sum of expense) is not very Restful in my opinion. We can make some simple endpoints like "/expense/pretaxtotal?period=month" for simple queries.
    - If we want a more structured and scalable API, we may want to look into OData or Facebook's GraphQL.

## Important files
Most of the files are generated from ASP.NET template. Please focus on these files:
- Controllers: HomeController, ExpensesController (https://goo.gl/uZQaJw)
- Views: Home/Index.cshtml, Expense/montly.cshtlm (https://goo.gl/L5I88N)
- Models: Expense, TotalExpensesByMonth, WaveContext (https://goo.gl/P1W9nZ)
- DatabaseHelper (https://goo.gl/av4qc1)

## Setup
- Install SQL Server Express: https://www.microsoft.com/en-ca/download/details.aspx?id=52679
    * Please choose Windows Authentication for simplicity: https://goo.gl/uIisul
    * Create a blank database and name it Wave
    * The connection string I use is: "Server=.\SQLEXPRESS;Database=Wave;Trusted_Connection=True"
- Install Visual Studio Community: https://www.visualstudio.com/vs/community/
    * Please check the option to include Web Development (ASP.NET)
- Remove the Migration folder (https://goo.gl/FVSCGr)
    * For simplicity we can just remove the Migration folder and initialize again
    * Open Package Manager Console in Visual Studio and apply 3 commands consequently: Enable-Migrations, Add-Migration Initial, Update-Database (follow this link for more details if needed: https://goo.gl/0aYbJt)
- Click F5 to start the web app in debug mode
    * If you don't want to run the app in Visual Studio, you can use IIS Express as the test server to run the web app from command line:
        + Navigating to the IIS Express installation folder (C:\Program Files\IIS Express)
        + Run this command (replace c:\myapp with the folder of the project): iisexpress /path:"c:\myapp\" /port:9090
