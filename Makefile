PATH := ./node_modules/.bin:$(PATH)

# Use variables with defaults to allow overriding on system where
# node or yarn are not on $PATH
NODE := node
YARN := yarn
TAPE := $(NODE) --harmony ./node_modules/.bin/tape
TAPSPEC := tap-spec
STANDARD := standard

run: ## Start the application server
	node --harmony server.js | ./node_modules/.bin/merry

help: ## Show available targets
	@printf "$(shell tput -Txterm setaf 2)"
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'
	@printf "$(shell tput -Txterm sgr0)"

deps: ## Installs all required dependencies
	yarn

# See https://github.com/feross/standard
lint: ## Ensures your code follows the "standard"
	$(STANDARD) --fix

test-unit: ## Run unit tests
	$(TAPE) tests/unit/*.js | $(TAPSPEC)

test-integration: ## Run integration tests
	$(TAPE) tests/integration/*.js | $(TAPSPEC)

test-system: ## Run system tests
	$(TAPE) tests/system/*.js | $(TAPSPEC)

test: ## Run all tests including style checks
test: lint test-unit test-integration test-system

db-create: ## Creates a new database for the application to use (run once)
	psql -c "CREATE IF NOT EXIST ROLE wave_challenge WITH SUPERUSER LOGIN PASSWORD 'wave_challenge'"
	psql -c "CREATE IF NOT EXIST DATABASE wave_challenge WITH OWNER wave_challenge"

db-migrate: ## Runs all pending migrations againt the database
	./node_modules/.bin/knex migrate:latest

db-rollback: ## Reverts the last migration
	./node_modules/.bin/knex migrate:rollback

# Call passing in a NAME for the migration file, ex:
#
#	make db-create-migration NAME=add-users-table
db-create-migration: ## Create a new migration file
	./node_modules/.bin/knex migrate:make $(NAME)
