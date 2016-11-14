### Install Redis
`brew update`
`brew install redis`

### Setup
`bundle install`
`rake db:create`
`rake db:migrate`

### Start Servers
`rails s`
`redis-server`
`bin/cable`

### Explanation
I built the application using 2 key components Rails 5 provides; ActiveJob and Action Cable.
ActiveJob runs the CSV parser asynchronously to not block the main web thread and ActionCable notifies the browser through web sockets that a new record has been created and displays it in the table.

I included 5 models in my implementation; category, tax, employee, employee expense and document. The last one is simply to store the imported CSV files and the first three are components of an employee expense.

The csv importer code is in helpers/csv_importer.rb

Currently, upon upload, employee expense rows are appended without sorting or grouping and you need to refresh the page to see the sorting and grouping. So to improve this solution I would write more complex inserting javascript.

## Evaluation
Evaluation of your submission will be based on the following criteria. 

1. Did you follow the instructions for submission? 
1. Did you document your build/deploy instructions and your explanation of what you did well?
1. Were models/entities and other components easily identifiable to the reviewer? 
1. What design decisions did you make when designing your models/entities? Why (i.e. were they explained?)
1. Did you separate any concerns in your application? Why or why not?
1. Does your solution use appropriate datatypes for the problem as described? 
