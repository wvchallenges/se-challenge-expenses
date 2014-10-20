# Getting Started

First, clone this project and change to its directory.
```
git clone <repo_location>/se-challenge.git
cd se-challenge
```

Install Homebrew from http://brew.sh/

Install Python:
```
brew install python
```

Install Postgres:
```
brew install postgres
```

Configure Postgres:
```
initdb /usr/local/var/postgres

createdb csvstorage
```

Start Postgres:
```
postgres -D /usr/local/var/postgres
```

Set the connection string environment variable. Mine looks like this:
```
export DATABASE_URL=postgres://alex:@localhost:5432/csvstorage
```

Create a virtualenv:
```
virtualenv venv
```

Activate virutualenv
```
source venv/bin/activate
```

Install dependencies:
```
pip install -r requirements.txt
```

Start the server:
```
python src/server.py
```

Navigate to http://localhost:5000 in Chrome or Fox and follow the on-page instructions.

# Three Things I'm Proud Of

## Running in the Cloud

This application also runs in the cloud on Heroku.

First, get started with Heroku at: https://devcenter.heroku.com/articles/getting-started-with-python#introduction

In the project directory provision a dyno and add postgres to it:

```
heroku create 

heroku addons:add heroku-postgresql:hobby-dev 
```

Run locally with:
```
foreman start
```

Run in the cloud with:
```
git push heroku master

heroku open
```

##Repurposed UI

I repurposed code from another project to quickly iterate on the UI for this one. I am proud of the speedup that allowed.

##Unicode

This project has skeletal unicode support. CSV files are often exported from Microsoft Excel, and nonexpert users can easily end up with files encoded, for example, as UTF-16BE. There is skeletal support for detecting and parsing these encodings included, but I abandoned it when I decided to use PG to ingest the CSVs directly (in the interests of speed).

# TODO

Add a fade to a spinner image to show the upload is working when there's a slight delay (eg, on Heroku).