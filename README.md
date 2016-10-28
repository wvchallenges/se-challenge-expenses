# README

I built this using a small state machine inside of the `CSVFile` class and a
background worker to handle parsing the CSV file. In my experience CSV files can
be notoriously difficult to parse and offloading it to background process allows
for the web server not to be blocked while processing the CSV file.

I also have test coverage on most of the service classes which perform most of
the heavy lifting. This should allow for some extensions to be made to the
parsing of the CSV file while maintaining code quality and assurance that we
haven't caused a regression.

## Ruby Version

2.3.1 MRI

## System dependencies
You will need the following installed and running locally to run the application:
  * postgresql
  * redis (for background jobs)

## Database creation
```
> bundle exec rake db:setup
```
## How to run the app

You'll need the `foreman` gem to run the app.

```
> foreman start
```

## How to run the test suite

```
> rspec spec/
```

## Services (job queues, cache servers, search engines, etc.)
  * Using Siqekiq as a background worker
