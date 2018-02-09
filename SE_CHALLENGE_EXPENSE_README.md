# Software Requirements

Ruby 2.5.0
Rails 5.1.4
Postgresql 9.6.6

# Setup
The following are the steps used to set up the environment to run the web application. This setup was built on Ubuntu 17.

## Ruby / Rails

1. Install RVM (https://rvm.io/rvm/install)
2. Install Ruby 2.5.0
> `rvm install Ruby-2.5.0`

>Note: If you get a permission error, then you may need to add the current unix user to the RVM group: `rvm group add rvm "$USER"` and then log out, and log back in. You can check if the current user is part of the `rvm` group by typing `id`

3. Install Rails
> `gem install rails`

4. Install nodejs
> `sudo apt-get install nodejs`

## Postgres

1. Install Postgres
> `sudo apt-get install postgresql postgresql-contrib`

2. We will now set up the postgres database. Log as the postgres user:
> `sudo -i -u postgres`

3. Enter the postgres cli
> `psql`

4. Create a new role named, es_challenge_expenses with permissions
> `CREATE ROLE se_challenge_expenses LOGIN CREATEDB PASSWORD 'password1'`

## Gemfiles

5. Setup the Gemfiles
> `bundle install`

> Note: If you get errors about postgres, then try installing the following:
`sudo apt-get install postgresql-client libpq5 libpq-dev` and `gem install pg`

## Database

## Done

Now run the server