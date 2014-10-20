## Getting Started

1. First, clone this project and change to its directory.
```
git clone <repo_location>/se-challenge.git
cd se-challenge
```
1. Install Homebrew from http://brew.sh/
1. Install Python:
```
brew install python
```
1. Install Postgres:
```
brew install postgres
```
1. Configure Postgres:
```
initdb /usr/local/var/postgres

createdb csvstorage
```
1. Start Postgres:
```
postgres -D /usr/local/var/postgres
```
1. Set the connection string environment variable. Mine looks like this:
```
export DATABASE_URL=postgres://alex:@localhost:5432/csvstorage
```
1. Create a virtualenv:
```
virtualenv venv
```
1. Activate virutualenv
```
source venv/bin/activate
```
1. Install dependencies:
```
pip install -r requirements.txt
```
1. Start the server:
```
python src/server.py
```
1. Navigate to http://localhost:5000 and follow the instructions.


1. heroku create
1. heroku addons:add heroku-postgresql:hobby-dev
1. git push heroku master

heroku addons:add heroku-postgresql:hobby-dev

## What I'm Proud Of

Unicode
UI
Cloud/Heroku
Prepurposed Code