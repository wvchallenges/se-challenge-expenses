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





The challenge itself is limited in scope but reality is seldom the same, and often with unexpected complexity introduced throughout the development process. Hence I put an emphasis on code reusability by having a modular structure - it uses independent angular services to handle api requests and data conversion, and with majority of app logic being done on client side following MVC pattern with Angular. The backend api accepts converted data, stores it in sqlite and returns sorted data - purposefully kept simple.
