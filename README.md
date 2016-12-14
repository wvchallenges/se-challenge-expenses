# Wave Engineering Challenge

This application is built for taking a csv file with a list of expenses, insert them to a sql database and display monthly expense summaries.
See [REQUIREMENTS.md] for more details.

## Getting Started
- Follow [API Doc](api/README.md) to start the API
- Follow [Web Client Doc](web/README.md) to start the web Client

Open browser to the web client, by default it's http://localhost:4200/.
The interface is pretty basic and self-explanatory.

## Architecture Overview
This application is broken into two main pieces: API and web client. By breaking up the system in those two main pieces, it allows us:

- easily create new client application consuming the api
- scale api and web front-end independently
- secure the api (currently it's not) to only white-listed clients
- make each system more easily testable

### API
Using Express as web server and Sequelize ORM, backed by a file-based sqlite databsess. This allows easy initial development and demo purposes (no need to setup sql servers on each new machines), while making upgrading to a more serious database quite easy.

There are a few gotchas in here:

- date grouping

  There has been some code performance tradeoffs made to avoid being tied into sqlite. This is probably one of the first things need changing when we start considering performance and scalability.

- timezone
  I took a shortcut around timezone, we are using web server timezones in our calculations based on following assumptions:
  - it is date-only calculation, no time calculation is involved
  - the server performing the import and server doing the display are in the same timezone

  If we cannot guarantee the above conditions, we will have to revisit this shortcut and probably change it, otherwise possible miscalculation could happen.

- string encoding
  We are assuming the csv file is all ASCII here,

### Web Client
Not much to say here, a very basic Angular 2 implementation.
