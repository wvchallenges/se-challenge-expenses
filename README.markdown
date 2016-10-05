# Wave Software Development Challenge
Once you're done, please submit a paragraph or two in your `README` about what you are particularly proud of in your implementation, and why.
    
### Requirements    
I fulfilled the requirements, since the app takes a csv file as input, uploads it via a form, the server parses the contents, saves them into a database and finally the a table with the aggregated expenses is rendered.

### Tech
Angular.js  
Express.js (Node.js)  
PostgreSQL

### Setup the app   
##### Setup (App):
    npm install  
    bower install  
    sh config.sh to fire up the app.  
    visit http://localhost:3000/#/upload to open the app
    
##### Setup (PostGreSQL DB)  
    start psql  
    \i db.sql

##### Implementation
I completed the assignment in a reasonable amount of time.  
For the frontend component I used a basic Angular.js template with a single route.   
For backend, I used Express.js (built on Node.js). Node.js is really handy since it takes minimal setup to scaffold an app and there is a abundance of third-party modules accessible via the npm registry.  
I used a few of these modules to parse the csv file and its contents.  
I am proud that in the limited time I spent on development, I maintained a lean route file that simply takes in the HTTP request object and offloads the tasks to respective service files.  
Therefore, the backend code is modular and can be extended easily.


## Evaluation
Evaluation of your submission will be based on the following criteria. 

1. Did your application fulfill the basic requirements?
1. Did you document the method for setting up and running your application?
1. Did you follow the instructions for submission?
