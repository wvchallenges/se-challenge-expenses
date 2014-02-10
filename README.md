# The Expense-o-tron 5000

Do you find yourself accepting expense sheets from Don Draper and Steve Jobs? Is
Jonathan Ives buying "laptops from HP" and expensing it? Then look no further,
friends. The Expense-o-tron is here to help.

## Features

Check out these amazing features:

* Takes a CSV file
* Saves the data as expenses
* Outputs a report with the monthly total expenses from that CSV file

As an added bonus, it also shows monthly totals from the CSV files you
previously downloaded!

## Installation

All this can be yours by cloning the repo ...

    $ git clone https://github.com/wlangstroth/se-challenge

... visiting that directory ...

    $ cd se-challenge

... running bundler ...

    $ bundle

... setting up the database ...

    $ bundle exec rake db:setup

... and starting the server.

    $ bundle exec rails s

Webrick will run by default on port 3000, so point your favourite browser to
`localhost:3000` and behold the Expense-o-tron in all its majestic glory.

If you're having trouble, I blame rvm. Or rbenv. Use the other one.

Note that the relational database being used is sqlite3, so you probably don't
need to install anything.
