# Wave Software Development Challenge
David Eysman's challenge for Wave

## Installation

When in the directory containing this challenge, execute the following from commmand line:

```
bundle install
```

```
rake db:create
```
```
rake db:migrate
```

```
rails s
```

Then navigate to `localhost:3000` in your browser where you will be promted to upload an expense document.

## Implementation

The overall implementation of a Rails app is something I am proud of because this challenge was the first time I've ever set up a new web app from the ground up. My experiance with Rails during my internship was coming on to an already mature system where the majority of my work was done adding functionality to models. I found this to be an awesome learning experience because I was able to build a (however small it is) web interface to interact with the model aspect of MVC that I was already familiar with. Dealing with routing and displaying information to a web page is not something I'm very experience with so I'm happy that I got some more exposure to these parts of the stack. Representing employees and expense categories as their own entities (models / tables) makes it straightforward to query data using ActiveRecord. ie search by employee to see all of an indivuduals expenses. 

Had I been given more time to make this challenge truely production ready, I would have seperated the CSV parsing out in to a delayed job so as not hog resources on the server side and not to keep users waiting for large files to be processed on the client side. I also would have written specs for all the models and controllers in rspec so if someone where to change the code in the future, they would not be able to break existing functionality.  
