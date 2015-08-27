In building this Rails app to parse and import accounting data, I designed it in the best interest of the long-term growth of Wave Accounting. After all, this is just one company that's been acquired; what happens when the next one comes along? :) 

As a result, I made a few decisions to this affect at the outset that will help the app's growth should its use and scope change later on.

The relational database structure that I created logically stores data parsed from the files. An employee record is created if it doesn't exist in the database and each employee "has many" expenses, each of which is recorded with the relation to which employee made it.

Instead of maintaining a record of each tax amount, I created a database for taxes, calculating the rate of each different tax. Then, when it comes time to calculating the totals, that's easily done by which sales tax was being used by the expense.


One new discovery that I'm excited about using in this app is the inverse_of option in my association between employee and expenses. Since it made logical sense for expenses by month to be a view under the expenses controller, I was trying to find a way of showing the information of the employees who made the expenses; inverse_of solved that for me.

