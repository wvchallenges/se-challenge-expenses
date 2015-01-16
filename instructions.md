# Instructions

The stack is simple, it uses Python and PostgreSQL. Let's get to it!

## Step 0: Software Requirements

You'll need Python and PostgreSQL. I recommend using [Homebrew](http://brew.sh). Once you have Homebrew, run `brew install postgresql python` to get set up. Follow the PostgreSQL instructions from Homebrew to run it. It'll probably tell you to do something like `postgres -D /usr/local/var/postgres`.

## Step 1 (optional): Virtualenv

To get the Python dependencies running I always use virtualenv and pip. If you're not familiar, virtualenv+pip works like Bundler or npm for Python. This is only necessary if you need to isolate environment from version conflicts. If you have a vagrant environment just for this, it's not necessary. However, I often run:

```bash
easy_install pip
pip install virtualenv
cd george-wave-solution
virtualenv venv
. venv/bin/activate
pip install -r requirements
```

Sitenote: If you use fish shell like me, you want to run `. venv/bin/activate.fish`

## Step 2: Postgres

Whether you decided to make a new local Postgres database or you already have one, you need to bootstrap the right tables. Postgres is a comprehensive database, so it'll demand that you set up the right users first.

```bash
createuser -s gggritso
psql postgres
create database wave
```

Then exit Postgres with `\q` and run `psql -U gggritso wave -a -f bootstrap.sql` to set up the tables.

## Step 3: Running the app

```bash
cd george-wave-solution
virtualenv venv
. venv/bin/activate
nosetests
python app.py
```

Cheers!
