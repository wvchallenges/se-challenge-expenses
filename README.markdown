# Wave Software Development Challenge

## Implementation Notes

The most interesting aspect of this implementation is the balance between the back-end, front-end and testing.
Also, this application was developed using the Behaviour-Driven Development methodology with the Cucumber framework.


## Environment

1. Ruby 2.3.1
1. Rails 5.0.0.1
1. PostgreSQL 9.6

## Instructions for Running the application

Install the dependencies

```
bundle install
```

Setup PostgreSQL database and configure it according to database.yml file


Run migrations

```
rake db:migrate
```

Start the application

```
rails s
```

## Instructions for Running the tests

Install Mozilla Firefox web browser (tested with version 45.0)

```
rake cucumber
```

