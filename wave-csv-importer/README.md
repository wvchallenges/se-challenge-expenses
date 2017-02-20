# README

This project was completed in Ruby on Rails.

Install instructions (Ubuntu):

0) Install git if you do not have it:
  - sudo apt-get install git

1) Install Ruby (using rbenv):
  - sudo apt-get update
  - sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs
  - cd
  - git clone https://github.com/rbenv/rbenv.git ~/.rbenv
  - echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
  - echo 'eval "$(rbenv init -)"' >> ~/.bashrc
  - exec $SHELL

  - git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
  - echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
  - exec $SHELL

  - rbenv install 2.4.0
  - rbenv global 2.4.0

Verify Ruby install:
  - ruby -v

2) Install Bundler
  - gem install bundler
  - rbenv rehash

3) Install Rails
  - curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
  - sudo apt-get install -y nodejs
  - gem install rails -v 5.0.1
  - rbenv rehash

4) Verify Rails Installation
 - rails -v

5) Run the project
 - move into the project directory `wave-csv-importer`
 - bundle install

Create the database
 - rake db:create
 - rake db:setup

Run the local webserver
 - rails s
 - go to localhost:3000 in your web browser

GENERAL NOTES AND WHAT I AM PROUD OF AND HAPPY ABOUT

  Working with front end views was an interesting learning experience as I have
  not really done that. I am happy with how quickly I learned them though.
  I focused more on the data modelling part of this project as I believe I am
  stronger there. I created three tables, which can be viewed in /db/migrate/.
  Basically, a User table, and Category table, and an Expense table. The expense
  table has foreign keys to both the User and Category table (to facilate doing
  something like user.expenses in code in the future). I debated on created another
  table for tax types but I decided against it because I couldn't forsee a use
  case for it.

  The bulk of my work are in these files:

   - wave-csv-importer/app/controllers/csv_form_controller.rb
   - wave-csv-importer/app/models/expense.rb

WHAT I AM NOT HAPPY ABOUT

  - I have no testing, which is not something I would ever otherwise do
  - There is a general catch-all for errors (not exceptions) which routes to a
    generic error page. I think more specific errors are better.
  - There is a db connection opened for every row in the csv- this in my opinion
    should be done with a bulk_insert
