# Wave Software Development Challenge

## Installation

You should be able to install this application on all major operating systems (Windows, Mac, Linux).

**Pre-Requirements**

You'll need to have the following tools installed on your computer (click the links for OS-specific instructions):

1. [git](http://git-scm.com/downloads)
2. [NodeJS](http://nodejs.org/download/)
3. [Grunt](http://gruntjs.com/getting-started)
4. [MySQL](http://dev.mysql.com/downloads/). *Note: This project assumes that you are have installed the database locally, using the username 'root'. If that is not the case, you'll need to make changes in config/config.js*


**Instructions**

1. Git Clone this repository.
2. In a shell window, navigate into the repository folder.
3. Run the command `npm install`.
4. Log into MySQL (e.g `mysql -u root -p`) and run the command `source dbCreation.txt`. Then exit MySQL.
5. Set the environment variable `ORM_PW` to be the MySQL password.
6. Run the command `grunt`. This will create the build, start the server on port 3000 and watch the development fiiles for changes.


## What I Like About My Implementation

This challenge ended up being a big refresher lesson for me in backend development. Unfortunately that meant not spending a lot of time on the front-end side of the application. Still, here are things I like about this application:

1. It uses Handlebars as both the rendering engine for Express, and the templating engine for widgets.
2. It uses ORM on the backend, which means it would take minimal work swap MySQL with PosgreSQL and other relational SQL databases.
3. RequireJS, LESS and Grunt have been set up so the client only loads one JS file and one CSS file.
4. The client-side is set up to be easily expandable by creating new widget folders (although at the moment there is only one widget, csvUploader). I like having widgets defined within folders because it makes it easier to insert them in a new project.
