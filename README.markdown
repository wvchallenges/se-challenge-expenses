# Tracker - Wave Software Development Challenge

This is Roel Bondoc's submission to the Wave Software Development Challenge.
It has been implemented using the Ruby on Rails framework. The front end was
implemented using Bootstrap.

You will need to have at least Ruby 2.2.2 installed as a prerequisite.

## Instructions

1. After cloning the repo, install the gems:
  ```
  $ bundle install
  ```

2. Run the migrations to setup the database:
  ```
  $ bundle exec rake db:migrate
  ```

3. Run the specs to ensure they pass:
  ```
  $ bundle exec rspec
  ```

4. Start the server:
  ```
  $ bundle exec rails server
  ```

By default the tracker web app should now be available on your machine on port
`3000` by default. Navigate to the app using a browser. You will then be able
to use the upload feature to upload a csv file.

Please note, each subsequent uploads will destroy all previous data.

## Implementation Notes

This was actually a fun exercise to do. I can see that there could be many ways
to implement a solution for this app all with varying levels of effort and
complexity. I felt that I took a modest approach in my implementation. One area
of focus was the denormalization of data when importing the csv. This ensures
employees, categories, and taxes are normalized. I also isolated and abstracted
the complexities around the expense grouping. By utilizing an `ExpenseGroup`
class, the code allows for further expansion of grouping features when needed.
