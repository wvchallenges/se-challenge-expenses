# README

This is my submission to the Wave Software Development Challenge.

During the development process I made a few decisions based on assumptions. Also, there are many things that I wish I could have added to my solution, but because of the short amount of time that I had to implement it I couldn’t. I’d love to talk about this all in person :-)

I’m proud of a few things in my implementation (and obviously not proud of others - please ignore the ugly UI and bad UX). I like how I organized the classes and split responsibilities: besides the main models (Category, Tax, Employee and Expense) I also created the ExpenseData model to represent an expense row from the uploaded file, and the ExpensesImporter service that is responsible for reading the file and creating the records. One thing that I really like about my solution is that the records parsed from the uploaded file are all created inside a transaction, which means that if the processing fails it will rollback and not add anything to the database (thus there is no confusion about what got processed and what didn’t - the user can simply start from scratch). I also like how I kept the methods short and the controller clean - managing the application flow and not business logic, and the fact that I added a (relatively) good test coverage.

I’m also proud of my keen eye because I think I found a small mistake on your spreadsheet (data_example.csv). Every row that has a CA Sales Tax has a tax percentage of 7.5%. The NY Salex Tax rows have 8.8% except for one of them (the “Client dinner” one) that has 7.5% - this one was probably calculated wrong, as if it was CA. Maybe this was intentional or isn’t really a mistake but I wanted to take the opportunity to show that I’m good with details!

### Setup

This project was developed using `Ruby 2.3.1` and `Rails 5.0.1`. It uses the default `SQLite3` database for simplicity.

Run `bundle install` to install the required gems.
Run `bundle exec rails db:setup` to set up the database.

### Run the app

`bundle exec rails server`
Then go to `http://localhost:3000` to access it.

### Run the test suite

`bundle exec rspec`
