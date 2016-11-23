#SQL Grapher by S.H. Wan
The SQL Grapher will take any .csv file of the same format and fields as data_example.csv as input and graph the pre and post tax monthly expenses.

##My Process
I originally built the app to take a .csv input, store it in a database, and spit out a html table of a query on the database. However I felt that this early version of the app did not showcase my approach to software development. I believe that every app I deliver will be used by someone so I have a duty to make my app as simple to use as possible and as pleasant to look at as possible. I didn't think the first version fit in with my own philosophy, so I developed this version of the app to include an angular frontend with material design to power its looks and feel. This is what I am most proud of and this is what I want to showcase to you guys.

##Requirements and Installation
* The web app requires node.js among various other packages to be installed and run. If you do not have node.js please go to https://nodejs.org/en/download/ to get the latest version. This node.js distribution should also have the npm package manager that will download all third party packages we used.

1. Clone the git repository to your local workspace.
2. Run "sudo npm install" from the workspace, this command will install the third party packages that is used in this web app. 
3. Run "node server.js" to start the server.
4. The web app is located on http://localhost:8888/ by default.

##Technical Details
The main stack for this app was a modified MEAN stack with a sqlite3 database rather than a mongo one. I chose sqlite3 over mongo because it was a relational database which made the aggregation of data extremely simple. A table is created to store all the fields from data_example.csv as text with the exception of the pretax amount and tax amount columns which are stored as integers to facilitate database summations. The frontend of the app was built on angular and handles all the interactions with the users. Angular is used to read and send the uploaded .csv file to the server which then processes the file and stores its data into the sqlite database. Angular also makes calls to the server to pull the monthly expenses data from the database and graph it on the webpage. 