# README

This sample was developed against `Ruby 2.0.0`, Rails 4.1 and SQLite. It was tested against Ruby `2.2.1`. All the requirements except ruby, a Javascript runtime, and `bundler` can be installed via `bundler`.

## Simple installation

If you have `ruby`, the `bundler` gem, and a default Javascript runtime installed, the simple installation instructions are

  - launch a terminal
  - create an appropriate directory to store the code (*e.g.* `> mkdir git`)
  - change into that directory `> cd git`
  - checkout the code `> git clone https://github.com/jimgraham/se-challenge.git`
  - move into the source directory `> cd se-challenge/waexpenses`
  - install the necessary gems via bundler `> bundle install`
  - migrate the database via rake `> rake db:migrate`
  - Optional: run tests `> rake test`
  - start the server `rails s`
  - navigate to the application [http://localhost:3000](http://localhost:3000)

If you need more detailed instructions, there is an [`Installation.md`](https://github.com/jimgraham/se-challenge/blob/master/waexpenses/Installation.md) file in this repository that details all the steps to install this app on a Vanilla Ubuntu machine.

# Comments

## Duplicate imports

The application will not import the same `.csv` twice. It looks for duplicate expense entries by assuming a duplicate is:
  
 - belongs to same employee
 - has the same date
 - has the same amount.

`.csv` files with new expenses will be imported. One could add rows to the existing `data_expenses.csv` file and only the new rows will be imported.

## Some interesting ideas

I spent most of my time on the backend data model. I did not spend a lot of time on the UI, but did work a bit to get the money columns right aligned and the tables a bit cleaner.

### Data Model

The data model has expenses, taxes, tax amounts, categories, and employees. Each can be viewed within the app. This allows investigating expenses through different views.

For example:

  - which employee has the highest expenses?
  - in which category do we spend the most money?
  - in which tax jurisdiction do we spend the most money?
    - (this can be important for getting tax credits, *e.g.* HST credits)

Some fun additions that I added include

  - The employee name can be parsed either "Firstname lastname" or "Lastname, firstname". There are unit tests to detail this behaviour
  - Categories are created in a hierarchy. So "Computer - Hardware" is two categories: a parent "Computer" category and a child "Hardware" category. This allows the user to see what's spent on
     - "Computer - Hardware"
     - "Computer - Software"
     - "Computer" - all including both "Hardware" and "Software"
  - Although it's not part of the `data_expenses.csv` file, I allowed for multiple taxes in the `.csv` if the user adds additional columns. So you can have taxes paid to multiple jurisdictions. For example one might have separate "PST" and "GST" tax columns. There is a test for importing from these types of files in `test/data/data_example_multiple_taxes.csv`

