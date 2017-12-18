# Wave Software Development Challenge

This application features a frontend (client) and a backend (server) component.

## Frontend

**Technologies**: JavaScript, Vue.js.

The frontend component is responsible for:

1. Accepting CSV files containing employee expense reports from the user,
2. Uploading said files to the server for processing and storage, and
3. Displaying a summary of the data parsed by the server.

## Backend

**Technologies**: Go, SQLite

The backend component is responsible for:

1. Handling and parsing the contents of files uploaded containing CSV data,
2. Parsing said CSV data and extracting information about employees and expenses,
3. Storing information about employees and expenses in a relational database, and
4. Writing information about the expenses parsed from the CSV file to the client.

## Setup

### Install the required tools

1. Install the [Go compiler and developer tools](https://golang.org/dl/).
2. Install the [LTS version of Node.js](https://nodejs.org/en/).
3. Install [SQLite 3](https://www.sqlite.org/)- you may wish to use your OS' package manager here.
4. Clone this repository.

### Preparing and running the client

Assuming you have cloned this project to `se-challenge-expenses`:

```bash
cd se-challenge-expenses/client
npm install
npm run dev
```

If these steps succeeded, you should be able to navigate to `127.0.0.1:8080` in your web browser
and start interacting with the frontend.

### Preparing and running the server

Assuming you have cloned this project to `se-challenge-expenses`:

```bash
cd se-challenge-expense/server
go get github.com/mattn/go-sqlite3
go build
./server
```

If these stetps succeeded, you should see some output in your terminal indicating that the server
is listening on `127.0.0.1:9001`.

## Highlights

The server component of this project has been designed in such a way that adding new functionality can
be done in a way very similar to how the existing functionality has been positioned.  By abstracting
functionality related to database operations into interfaces that are not coupled to any particular
implementation strategy, it is possible to add more functionality by first defining new interfaces
followed by any number of implementations thereof.  This approach also lends itself very well to
testing, as mock implementations for each interface can be produced easily, allowing us to simulate
different scenarios within our mocks and not necessarily have to deal with an actual database in our
unit tests.

While not particularly my area of expertise, I am also rather proud of the simple, functional approach
that I was able to take to building components for the frontend.  Considering, for example, the
`ReportSummary` component, we can see that the functionality supported by this component is
implemented using simple, pure functions. This approach lends itself very well to code reuse and,
again, testing, as pure functions can be tested without any concern for side-effects such as database
interactions.
