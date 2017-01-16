# Start the application server
run:
	node --harmony server.js | ./node_modules/.bin/merry

# Installs all required dependencies
deps:
	yarn

# Ensures your code follows the [standard](https://github.com/feross/standard)
lint:
	./node_modules/.bin/standard --fix

# Creates a new database for the application to use (run once)
db-create:
	psql -c "CREATE ROLE wave_challenge WITH SUPERUSER LOGIN PASSWORD 'wave_challenge'"
	psql -c "CREATE DATABASE wave_challenge WITH OWNER wave_challenge"

# Runs all pending migrations againt the database
db-migrate:
	./node_modules/.bin/knex migrate:latest

# Reverts the last migration
db-rollback:
	./node_modules/.bin/knex migrate:rollback

# Create a new migration file, call passing in a NAME for the file:
#
#	make db-create-migration NAME=add-users-table
db-create-migration:
	./node_modules/.bin/knex migrate:make $(NAME)

