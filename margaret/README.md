# Wave Se-Challenge

## Installation

Margaret was built using ruby 2.3.0, so check ruby version using `ruby -v`, otherwise add to rvm by using `$ rvm install 2.3.0` then `$ rvm use 2.3.0`. If you are missing rvm then please visit [The Rvm Site](https://rvm.io/rvm/install) for installation instructions for your machine.

Ensure you have rails by running `$ rails -v`. This is built on _rails 4.2.6_ so if uninstalled, run `gem install rails -v 4.2.6`.

Run `$ rake db:create` in order to build the database, after ensuring that you have installed PostgreSQL and it is running properly. See database.yml to configure db settings properly.

This project also runs on ElasticSearch and was developed using ElasticSearch 2.3.3. See elasticsearch website for information on installation. In order to run locally, ElasticSearch must be running at `localhost:9200`.

I have created some seed data which can get started, as well as initailize the ElasticSearch indices. Run `$ rake db:seed` to get this started.

To generate any .csv files to test this out with, you can run `$ rake margaret:csv:generate_fake` to generate a new expense report.

Finally run `$ rails s` to begin the server, and navigate to `localhost:3000` (or whatever your local may be set to in your hosts file) to begin.

Run `$ rspec` to run all tests for application.