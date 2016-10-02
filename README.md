# Expense Calculator
This is a Ruby on Rails web application that allows users to upload expense records from file or input manually. The data is stored in relational database. Users have the ability to manipulate on expense, employee, category and tax models. The application is also capable of generating a monthly report along with some JavaScript charts to let users
know their monthly expenses.

This project is in response to a coding challenge by Wave. Should there be further questions, please contact:
[Wave Accounting Inc.](https://www.waveapps.com/contact-us/), [Zijin Li](http://johnleebuaa.github.io/#contact) (author of project).

## Set Up and Run
This application is already deployed on
Heroku at [https://afternoon-brushlands-80284.herokuapp.com/](https://afternoon-brushlands-80284.herokuapp.com/). It's fully functional and accessible via public Internet. You can try it out right now by clicking the link above.

Alternatively, if you want to deploy this application on your local Rails server, please follow the commands below. Clone the repo on your correctly configured Rails server and then install the needed gems:
```
$ bundle install --without production
```
Migrate the database:
```
$ rails db:migrate
```
Run the application in a local server:
```
$ rails server
```

## Highlights
- I first did a normalization on the one large table provided by the challenge, and ended up using four tables for expense records, employee records, expense categories and tax names separately, thus reduced data redundancy, also easy to add new models in the future.
- Apart from parsing expense records from file, users can also input expense records manually. Employees, categories and tax names can be managed indepantly. Users can also check expense records under a single employee/category/tax name. All of the models support create, edit, display, and delete operations.
- Backend is standard Rails MVC architecture, added necessary validations on users' input to maintain robustness. Minimal cohenrence between models, made easy to add new models/features.
- Frontend used Bootstrap to build the UI so it's not too shabby. The app displays a table to show monthly expenses. Also used Chart.js and Chartkick to add two charts in the result page. So there is some limited amount of user-friendliness.

## Potential Improvements
1. Add sign up and log in feature so that employee can manage their own expense records. And there should be an admin to manage data on a higher level.
2. Add in place sorting and grouping of expense records so that users can view the data however they like. Maybe add the feature to generate expense reports with users' preferences. I.e. with selected charts and tables on chosen data fields, etc.
3. Add some touch ups to the frontend, such as nav bars, to improve user experience.