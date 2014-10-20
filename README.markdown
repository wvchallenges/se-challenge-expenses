# SE-Challenge Application
The SE-Challenge Application has been implemented to be a Single Page Application. It communicates with the backend through a JSON-API, and it uses angular.js to render the Front End.
Unlike some SPA codebases, the SE-Challenge App has been completely wrapped up in rails, as opposed to using grunt/bower to create a standalone front end app. 

A [live demo](http://se-challenge.herokuapp.com/) of this application is available [here](http://se-challenge.herokuapp.com/). Please note that the first load may take a while if the heroku application is sleeping. 

## Dependencies

The SE-Challenge Application was built and tested on top of Ruby 2.1.1 and Rails 4.1.6. All other dependencies will be installed by bundler.

## Installation Instructions
Run the following commands, line by line, in your terminal: 
> `git clone git@github.com:kosz/se-challenge.git`

> `cd se-challenge`

> `bundle install`

> `rake db:create`

> `rake db:migrate`

## Running Instructions
1. First make sure specs are passing by running : `rspec spec`
1. Then start up the server : `rails s`
1. Assuming that port 3000 is available, then direct your browser to http://localhost:3000
1. If port 3000 is in use then specify a different port, example : 4000, like so : `rails s -p 4000`, then direct your browser to http://localhost:4000

## Usage Instructions
1. Load the application page
1. You will have 3 options : Upload a file with a button, Upload a file through Drag and Drop or View the report on a previously uploaded file. 
1. Once you upload a new file, or select a previously uploaded file, you will view a Monthly Expense Report based on your selection. 

## Technologies Used
1. Angular.js, angular-ui-bootstrap, angular-file-upload, coffeescript, bootstrap ( ERB or HAML are not used as they are not needed )
1. Ruby on Rails
1. Rspec, FactoryGirl, Travis CI, CodeClimate   
1. sqlite3, postgreSQL ( the heroku deployment is using postgreSQL, the development branch uses sqlite3 for ease of setup )

## Strong Areas
1. The application has been built using angular.js, to be a `Single Page Application`. It is extremely fast and dynamic. 
1. The `UX design` has been taken into consideration. The call to action is clear, the interface is intuitive, and it doesn't look terrible. [read more...](https://github.com/kosz/se-challenge/wiki/UX-and-Responsive-Design)
1. `Responsive Design` has also been taken into consideration, the app scales and reacts to all screen sizes. This has been achieved without the Bootstrap Grid.
1. The rails controller as well as the angular resources have been implemented in a [REST-full](https://github.com/kosz/se-challenge/wiki/REST-full-implementation) manner. 
1. The code supporting the basic requirements has `full spec coverage` on the server side. [Travis CI and CodeClimate](https://github.com/kosz/se-challenge/wiki/Continuous-Integration) were used to uncover issues before they become problems.   
1. The database has been designed `taking into consideration potential hidden requirements`, spotted on the initial datastructure.  [read more...](https://github.com/kosz/se-challenge/wiki/Database-Modeling)
1. The application has been designed to be as `modular`, `extensible` and as `object oriented` as possible, given the time available for refactoring. This could of course, always be better.
1. Overall I believe the strength of this application dosn't necessarily reside in a single place, but instead, `attention to detail was given in all areas`, across all stacks, to demonstrate ability to work and adapt in any tier or technology.
1. The app has been managed on GIT with every commit providing the code to close an issue. Issues were tracked [here](https://github.com/kosz/se-challenge/issues?q=is%3Aissue+is%3Aclosed)

## Areas for Potential Improvement
1. Full spec coverage. Some methods are not being directly covered, instead we rely on higher level tests to test them out. 
1. Front end testing automation ( protractor was not used in order to keep the dependency list small )
1. Code refactoring. Spec Refactoring. Code could always be better, and given the limited time, I chose to spend time on extra features, rather than extra rubustness.
1. The app is html5 reliant, and was not tested on older browsers.  
1. The monthly expense report could have been written as a postgresql view.
1. The database objects could be even more modular.
1. The app doesn't scale ideally under 500 px width ( but i believe the scaling is still acceptable, just not ideal )
1. CSS not very organized, little importance was given to it.
1. Code comments. The code doesn't really have comments. Instead it is readable, for the most part, and documented here on the wiki. I am adaptable to both schools of thought, lots of comments in the code or no comments in the code. Either way I like documentation, and I like producing documentation, if the code isn't documented, I always provide various artifacts to facilitate transfer of knowledge. 
1. The app doesn't implement any error handling or validators, based on the requirements which indicated that the data will always be available in that format.
