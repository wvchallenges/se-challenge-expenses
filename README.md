## How to run

Make sure you have node, npm and sqlite3 installed

To download the project:
```
git clone https://github.com/myeung58/se-challenge.git
```
Install dependencies:
```
cd se-challenge
npm install
```
Run migration
```
knex migrate:latest
```
Run node server
```
npm start
```
go to localhost:3000

### Backend key technologies
- Express
- node
- Knex - query and schema builder
- Bookshelf.js - ORM for node.js

### Frontend key technologies
- Angular
- Angular UI Router
- PapaParse - CSV parser





Majority of app logic are done on client side following MVC pattern with Angular, with an emphasis on code reusability by having a modular structure - it uses independent angular services to handle api requests and data conversion. Simple backend api accepts converted data, stores it in sqlite and returns sorted data.
