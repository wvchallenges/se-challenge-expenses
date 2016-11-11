# Expense Monster

[ ![Codeship Status for hungryzi/se-challenge](https://codeship.com/projects/15dbab60-8a38-0134-e269-5a7c9acf56e8/status?branch=submission-zi)](https://codeship.com/projects/184407)

Demo: [http://expense-monster.herokuapp.com/](http://expense-monster.herokuapp.com/)

### *Omnomnom must eat expenses!*

A simple Rails app that imports expenses data from CSV to PostgreSQL database and shows a quick summary of expenses by month.

This app demonstrates my practices and workflows when working on a Rails app.
- Continuous integration (with Codeship here).
- Continuous delivery (with Codeship and Heroku here).
- TDD with RSpec, Capybara..
- Rubocop & Overcommit to enforce styleguide.

This is not my first time working on an app to import CSV files. From my past experience, CSV files are often malformed (missing column, wrong data type..). I've tried to make it easier for users in this case. First of, the whole uploading process is wrapped in a Transaction, so there is no situation where a file is processed halfway and user doesn't know where it fails and how s/he can continue. Secondly, if the error is in the data, the error messages shows the line where processing stopped so user to easily investigate. I've uploaded an example of a malformed file for you to try out [here](https://gist.githubusercontent.com/hungryzi/846f62cf890086e06b8967519b9d9716/raw/84dc69f572b50445bf442d4621da77bbd00e6f7c/invalid_data.csv). 

Hope you enjoy using the app!

## Assumptions made
- All expenses are in USD.
- Employee's name uniquely identifies employee.
- Employee's address is not important. The system only keeps one of the addresses in case an employee has filed multiple addresses with the expenses.

## Setup

### Requirements

- ruby 2.3.1
- `bundler` gem.
- PostgreSQL 9.4.1

### Setup commands

```
$ git clone git@github.com:hungryzi/se-challenge.git
$ cd se-challenge
$ git checkout submission-zi\
$ gem install bundler
$ bundle install
$ bundle exec rails db:setup
$ overcommit install && overcommit --sign # if you plan to commit something
```

### Run app

```
$ bundle exec rails server
```

After that command runs successfully, the app should be running on [http://localhost:3000](http://localhost:3000)

### Run test

```
$ bundle exec rspec spec
```



