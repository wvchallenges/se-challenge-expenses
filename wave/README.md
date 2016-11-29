== README

Updated solution for the wave challenge.

=== Quick Install

Make sure to have node installed (made with v6.8) and running.

Install postgresql to store the data. Create a database called expenses.

You can edit `knexfile` to alter the connection config for the db.

* Create a directory

* Clone repo into your own

* Navigate to appropriate folder (wave)

> npm install

> npm run dev:migrate

> npm run dev

You can then access the app from `localhost:3000`.

=== Thoughts

Figured I would update the app to use a purely javascript solution based on node + express + react.
Data is stored in a very simple manner and has a lot more room to grow.
The server folder also has plenty of room to improve in style and exports.
A better architected upload route should also be implemented to allow the app to scale properly.
