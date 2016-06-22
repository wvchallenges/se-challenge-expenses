# Wave Se-Challenge

## Installation

**NOTE**: All configurations for this app are specifically for development environments. It is not configured to run in a production environment.

### Installing ruby

Margaret was built using ruby 2.3.0, so check ruby version using `ruby -v`, otherwise add to rvm by using `$ rvm install 2.3.0` then `$ rvm use 2.3.0`. If you are missing rvm then please visit [The Rvm Site](https://rvm.io/rvm/install) for installation instructions for your machine.

### Installing rails

Ensure you have rails by running `$ rails -v`. This is built on _rails 4.2.6_ so if uninstalled, run `gem install rails -v 4.2.6`.

### Creating the DB

Run `$ rake db:create` in order to build the database, after ensuring that you have installed PostgreSQL and it is running properly. 

Ensure your `database.yml` file looks something like this:

```
...
default: &default
  adapter: postgresql
  pool: 5
  timeout: 
  encoding: unicode
  host: localhost
  username: <username>
  password: 

development:
  <<: *default
  database: wave_dev

...
```

### ElasticSearch

This project also runs on ElasticSearch and was developed using ElasticSearch 2.3.3. See elasticsearch website for information on installation. In order to run locally, ElasticSearch must be running at `localhost:9200`. Ensure your `chewy.yml` file looks something like this:

```
development:
  host: 'localhost:9200'
  prefix: 'dev'
test:
  host: 'localhost:9200'
  prefix: 'test'
```

### Seeding

I have created some seed data which can get started, as well as initailize the ElasticSearch indices. Run `$ rake db:seed` to get this started.

### Generating test data

To generate any .csv files to test this out with, you can run `$ rake margaret:csv:generate_fake > ~/some/path/to/testoutput.csv` to generate a new expense report.

### Start me up

Finally run `$ rails s` to begin the server, and navigate to `localhost:3000` (or whatever your local may be set to in your hosts file) to begin.

### Testing

Run `$ rspec` to run all tests for application. These include tests for the elasticsearch and query and controller classes, so they require that elasticsearch be running at the destination pointed to in `chewy.yml`