## Getting Started

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

Navigate to http://localhost:5000 and follow the instructions.


1. heroku create
1. heroku addons:add heroku-postgresql:hobby-dev
1. git push heroku master

heroku addons:add heroku-postgresql:hobby-dev

## What I'm Proud Of

Unicode
UI
Cloud/Heroku
Prepurposed Code