# Build / Run Instructions
## PreRequisites
1. node 6 or above (Make sure that the nodejs binary is named node and not nodejs)
2. npm 3

## Building the project
1. clone / checkout the project
2. `npm install` (Building the project)

## Running the project
1. Have a seperate shell / Terminal window and use `npm start` to start the project (make sure that the port 3000 is free)
2. open a browser to access the GUI - [http://localhost:3000](http://localhost:3000)
3. The window will be a rudimentary one where in you can paste the csv data
4. On Submit, the data is exported to the DB tables and a new page shows the expense summary (month wise)

# Implementation
This project is built using NodeJS / ExpresssJS with sqlite as the database. sqlite was chosen to keep the prerequisites and build instructions short.

## Database design
The focus was on relational data modelling. The expenses details are split among the three master / primary tables `employee`, `tax` and `expense_category` and a derived / secondary table `expense` which has references to the three master tables.

`employee` table holds the `name` and `address` of the employee. `tax` table contains the `tax_name`, `tax_rate`, `effective_from` and `ended_on` fields. Since the tax rate changes over the period, there can be mulitple rates for a tax between `effective_from` and `ended_on` dates. Moreover it is assumed that the date on which the taxRate is different, the old tax rate ends. `expense_category` contains the unique categories. For each of the expense line an entry is made in the `expense` table which refers to the `employee`, `tax`, `expense_category` table entries apart from storing the `pre_tax_amount` and `tax_amount`.

##Backend
The source files are under the server/ directory. controllers/ holds the files that deals predominantly with the business logic of parsing the expense file and calling the appropriate tables to populate the data. However parsing the expensesData and extracting unique values spills over to the individual model files too (employee, expense_category, tax & expenses).   

##Frontend
Frontend is a rudimentary piece which just does the bare minimum that is needed. index.html is the home page and on processing the request the result.html is loaded. error.html is for error handling. There is no frontend javascript logic. The html files can be found under view/ directory while the css can be found under public/stylesheets

#Limitations / Assumptions

##Assumption
As stated under the problem statement (about the input data)

##Limitations / Improvements
1. The whole data is loaded on to the memory and it is not optimized for memory
2. Basic sorting algorithm used
3. Models have both the spill over of business logic (parsing expense data) and  sqlite specific commands. Migrating to another db would need attention to the Model files
4. Fancy front end
5. Seperation of front end from back end
6. `Tax_Amount` is stored in expense table even though it has a reference to tax table. This can be considered bending the relational design. However retrospective tax amendments are rare and hence for easy retrieval and calculation, the tax_amount is also included in the expense table
7. Add configuration files
