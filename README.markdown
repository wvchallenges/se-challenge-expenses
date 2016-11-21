# Wave Software Development Challenge

## Installation Instructions

### Prerequisites

* *nix-based system (OS X, Linux, FreeBSD, etc.)
* curl
* Standard build toolchain (e.g. OS X XCode + command line tools, Debian build-essential, etc.)
* PostgreSQL server
* Postgres client and know where it's installed on your system (path to Pg client libs)
* Bash shell

### Installation Overview

The application is built using the Mojolicious framework "A next generation web framework for the Perl programming language.". It has very few dependencies and runs
on a built-in HTTP server connecting to a PostgreSQL server. 

The installation instructions assume no prior knowledge of Perl so it's based on the [Perlbrew](https://perlbrew.pl) development environment, which runs in user-space and
avoids any system-wide setup (no need for root) and also allows for easy cleanup of the complete development environment.

If you are already familiar with Perl you can skip Perlbrew altogether, and alternatively install the CPAN modules by hand or by other means (e.g. package/port system).

The overall installation sequence is:

1. Run the database schema script on an existing Postgres database
1. (Optionally) Install a Perl development environment such as Perlbrew
1. Install the Mojolicious::Lite framework and a few additional Perl modules
1. Run the application with Mojo's integrated server

### Install Command Synopsis

<pre>
  psql -U postgres sechallenge -f database/create_schema.sql
  curl -L https://install.perlbrew.pl | bash
  source ~/perl5/perlbrew/etc/bashrc
  perlbrew --notest install perl-5.20.3 #this will take a few minutes
  perlbrew switch perl-5.20.3
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n Mojolicious::Lite
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n UUID::Generator::PurePerl
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n Text::CSV_PP 
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n Mojo::Pg
</pre>

####Important Notes:

* To avoid conflict with your existing env, source the Perlbrew env only on the shell where you plan to run the app
* *Installation of Mojo::Pg may fail* if it cannot find the Pg client. If this happens just export the following variable and try again:
<pre>
  export POSTGRES_HOME=[path to your Pg client libraries]
</pre>

For example, on OS X with Macports and Postgres 9.6, the path would be /opt/local/lib/postgresql96/

### Detailed installation instructions

#### Create role and application schema

YMMV here but generally should be as simple as:

<pre>
  psql -U postgres sechallenge -f database/create_schema.sql
</pre>

You can of course use any existing database as the app will prompt for it on startup.

#### Install Perlbrew

<pre>
  curl -L https://install.perlbrew.pl | bash
</pre>

For other installation options please refer to: [https://perlbrew.pl](https://perlbrew.pl) 

#### Adjust the environment
<pre>
  echo "source ~/perl5/perlbrew/etc/bashrc" >> ~/.bash_profile
</pre>

*Open a new shell and Perlbrew should be working*

#### Install and activate stable Perl (local to your $HOME)
<pre>
  perlbrew install perl-5.24.0
</pre>

#### Install mojolicious and other modules

These modules will pull in other dependencies automatically:

<pre>
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n Mojolicious::Lite
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n UUID::Generator::PurePerl
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n Text::CSV_PP 
  curl -L https://cpanmin.us | perl - -M https://cpan.metacpan.org -n Mojo::Pg
</pre>

## Running the App

<pre>
  morbo se-challenge.pl
</pre>

The application will prompt for Pg host and database or press enter for defaults.

Point tour browser to http://127.0.0.1:3000 and that's it!

For the application credentials use:
* User: alex
* Password: las3rs

Alternatively, add you user to the $USERS hash in lib/SEChallenge/Model/Users.pm, save the file, and watch the application reload itself automatically!

# About my Submission

This challenge gave me the excuse to learn Mojolicious. It was one of things in my "fourth quadrant" to-do list, ever since I sold my last company I haven't had so much fun as I have had
learning it for this challenge. Initially I was going to do this in one of my favourite Web frameworks of all time: [*Catayst*](http://www.catalystframework.org), but given the requirement
"Your application should be easy to set up", Catalyst was definitively not going to cut it ;-) 

One of the main differences between Mojolicious and other web frameworks is that it also include Mojolicious::Lite, a micro web framework optimized for rapid prototyping and it offers
a very natural and seamless path to refactor into a very elegant and powerful MVC stack.

I started out this application as a single Perl script and very quickly refactored into full-fledged MVC pattern whilst maintaining some of the Mojolicious::Lite approach. I was truly impressed
at how the framework design adapts from prototype to full-fledged stack in literally minutes.

## Key Highlights of my Implementation

Although I am familiar with the full Web stack, I tend to stay away from the UI/UX side of things, so I am most definitively a "server guy", specialized in good database modelling, REST and
Internet-scale, and most importantly: *elegance*. I hope this implementation highlights this by means of:

* A normalized, and optimized, database model
* Clear code layout, separation of concerns, terseness and clarity (commented on non-obvious things only)
* Use of the full MVC stack including a bare-bones Mojolicious::Lite controller script but also Model helpers and a full-featured templating system for the Views.
* File processing code is separate from report code and logic/structure is already prepared for eventual async file processing
* Expense report submissions are separated and could eventually detect duplicate submissions
* Everything is accountable/audit-able from the original file to the user who imported the file.
* Not being afraid to learn new things (even for this first impression)

### Code Structure

<pre>
se-challenge                        # Application directory
| se-challenge.pl                   # Application script
|- database                         # Database schema directory
|- lib                              # Library directory
|  +- SEChallenge                   # Application namespace
|     +- Model                      # Model namespace
|        +- ExpenseProcessor.pm     # Main file processor and report helper
|        +- Users.pm                # Poor man's ACL 
|- t                                # Test directory
|  +- main.t                        # Main test
|- log                              # Log directory
|  +- development.log               # Development mode log file
|- uploads                          # To store uploaded files
|- public                           # Static file directory (served automatically)
+- templates                        # Template directory
   |- layouts                       # Template directory for layouts
   |  +- default.html.ep            # Default Layout template
   +- index.html.ep                 # Index file / login
   +- upload.html.ep                # Upload page
   +- expense-report.html.ep        # Expense report page
</pre>

Hours to develop (including learning Mojolicious): about 6

