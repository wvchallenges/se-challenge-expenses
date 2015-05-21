# Installing the Sample

This sample code requires

  - `ruby v2.0.0`
  - a javascript runtime for one of the bundled gems
  - `bundler`
  - `rails` (resolved with `bundler`)
  - the source code from GitHub (you're looking at it)
  - a `config/secrets.yml` file (not stored in GitHub by default)
  - a migrated database.

I have run this sample on Mac OSX 10.10.3, Windows 7 sp1 and Ubuntu 14.04. Since the Ubuntu installation is lacking the most requirements, I will go through how I installed the sample application there.

## Machine configuration

I downloaded a Virtual Machine image from http://www.osboxes.org/ubuntu/ for Ubuntu 14.04.2 Trusty Tahr 64 bit.

I installed Virtual Box (using version 4.3.20), and created a virtual machine from the image above.

Once the VM was running I installed the Virtual Box guest machine additions. https://www.virtualbox.org/manual/ch04.html 

At this point, we have a vanilla Ubuntu box with very little on it

## Installing `ruby`

I elected to install `ruby` via [RPM](https://rvm.io/rvm/install) Following their instructions, from a terminal.

 - Install the gpg key 
```
> gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
```
 - Install rvm and default ruby 2.2.1 
```
> curl -sSL https://get.rvm.io | bash -s stable --ruby
```
 - Install ruby 2.0.0

```
> rvm install 2.0.0
> rvm use 2.0.0
> rvm rubygems latest
```

## Installing `bundler`

I use `bundler` to install all the dependencies for this sample, including `rails` itself

``` 
> gem install bundler
```

One of the gems that I will be installing needs a javascript VM. It's easiest to install node now

```
> sudo apt-get install nodejs
```

## Get the source

One needs to put this source code onto the machine. The easiest way to do this is to do a `git clone` of this repository

#### Install `git` tools

```
> sudo apt-get update
> sudo apt-get install git
```

#### Get the source

```
 > mkdir git
 > cd git
 > git clone https://github.com/jimgraham/se-challenge.git
 > cd se-challenge/waexpenses
```

This will put the source code into a directory called `~/git/se-challenge/waexpenses`

## Install the open-source gem bundles (including `rails`)

```
> bundler install
```

## Create the `secrets.yml` file 

By default the `config/secrets.yml` file is not pushed to GitHub

create the secrets file

```
# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure the secrets in this file are kept private
# if you're sharing your code publicly.

development:
  secret_key_base: 

test:
  secret_key_base: 

# Do not keep production secrets in the repository,
# instead read values from the environment.
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>

```

## Create the database

```
 > rake db:create db:migrate
```

## Start the server

```
> rails s
```

## Navigate to the app

After all these steps, go to [http://localhost:3000/](http://localhost:3000)


 
