#fileManager
A web interface to manage csv file uploads and store them in a mongo database

#Project Directory Overview
 * [api]  //Backend API
   * [controllers]
      * [fileController.js]   // Backend controller
   * [models] 
      * [fileSchema.js]       // Model Schema for file uploads
   * [routes]
      * [routes.js]           // Export api routes
 * [app] // Public Folder               
      * [assets]              // Folder to put images, fonts, etc
      * [Components]
          * [addFile]
              * [addFiles.html]     // View for addFiles template
              * [addFiles.js]       // Controller for addFiles view
          * [home]
              * [home.html]         // View for home template
              * [home.js]           // Controller for home template
      * [lib] // Third Party Libs
          * [css]                   // For bootstrap
          * [js]                    // For query
      * [styles] // Custom styles
      * [templates] // Front End Views
          * [footer.html] // Footer template
          * [navigation.html] // Nav bar template
      * [index.html] // Index template
 * [gulpfile.js]     // Task Manager
 * [package.json]    // NPM Dependencies
 * [bower.json]      // Bower dependencies
 * [README.md]       // Setup guide
 * [server.js]       // Node backend
 * [.gitignore]      // Git ignore these files
 * [.bowerrc]        // Bower directory setup 

#Setup
You must have Nodejs, Bower and MongoDB downloaded. 

#Install Instructions
Clone the repository <code>git clone https://github.com/bitgord/fileManager.git </code>
cd into the folder <code>cd fileManager</code>

Alternatively, you can download it as a zip and cd into the folder.

download npm dependencides <code>npm install</code>
download bower dependencies <code>bower install</code>

#Build Application
<code>gulp</code>

#Search Database (You must be running a mongo server)
Go into mongo shell <code>mongo</code><br>
Move into fileUploads database which should be created after you run your app if you are connected to mongo<code>use fileUploads</code><br>
Query database to find all the files that have been uploaded<code>db.files.find().pretty()</code><br>
Clear database<code>db.files.remove({})</code>

#Accomplishment
This was my first project that required storing a csv file upload and I am most proud of figuring out how to do this. After some research I discovered the npm tool csvtojson, which proved to be incredibly helpful in solving the file upload part of the application. I am also proud of the gulpfile build integration, which will help with scaling the application moving forward. <br><br>

The next two steps to develop the application is to change the fileSchema to allow for numbers and other dataTypes to be stored in the database. This would enable the columns to be added to calculate the total expenses amount per-month. In addition, mocha should be configured to enable a test-driven development environment. Once this integration is setup, we could add in an authentication layer so only registered users would be able to upload files to the database. We could gather analytics using the total expenses amoung per month and present the change over time in a chart using a tool like d3.js. A way to innovate even farther would be to store certain data onto the blockchain to guarantee it has not been altered. 

#Todo
Change pretax and tax amount to be a number instead of a string<br>
Calculate total expenses amount per-month based on data
