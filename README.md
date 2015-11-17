# CSV Importer

Parses the CSV file `spec/fixtures/sample.csv` into a database by segregating the data into four models:

- Employee
  - name (string)
  - address (string)
- Category
  - name (string)
- Tax
  - name (string)
- Expense
  - date (date)
  - description (string)
  - pre_tax_amount (float)
  - tax_amount (float)

### Note
- The Index page displays the current data in the application
- *This application uses the SQLite database which does not support the money datatype.*

## Instructions

1. rake db:migrate
2. bundle exec rails server
3. Open http://localhost:3000 with your browser
4. Upload a file using the **Choose File** button and pressing **Upload**
5. Enjoy!

## Strengths

I am really proud of how I separated the business logic of parsing and uploading the models into the non-Rails classes, Parser and Importer, respectively. Both can be found in the non-Rails directory app/lib as opposed to app/models where the Rails-models are found.

I am happy to proclaim that I used Test-Driven Development as I developed this application.

## Things I Could Have Done Better

Take a look at ImportersController#create and you will see a method that is too long. Long methods are harder to test against to assure quality.
