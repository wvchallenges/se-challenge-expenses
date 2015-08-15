# Expense importer

## Getting started

### Notes about the installation process

#### Buildout

I use buildout to manage dependencies, it makes it very easy to get up and running. It also isolates your dependencies completely from your system, everything will be installed in the current directory.

It will also generate command line executables for all your dependencies' entry points in `bin/`. Instead for running `python manage.py <command>`, you will now run `bin/django <command>`.


#### Node

I've setup buildout to download and compile node for one package, less. This is mostly as a demonstration of what buildout can do.

You may want to disable this if you prefer to use a system-wide install of less.

  1. In `buildout.cfg`, remove `node` from the `parts` list on line 2.
  1. In `challenge/settings/base.py`, set `LESS_EXECUTABLE` to the path it can be found on your system. (Hint: `which lessc` in your terminal)


### Installation

    python bootstrap.py   # Only run the first time, it sets up bin/buildout and setuptools
    bin/buildout          # Will install all dependencies in the current directory (eggs/, parts/)
    bin/django migrate    # Run all migrations
    bin/django runserver  # Start the app server

And you're done, go to [127.0.0.1:8000](http://127.0.0.1:8000)


## What's next

The following are ideas on how to improve or extend the project, in no particular order.

### Better error handling

Errors when the uploaded file is invalid are not handled very well, in production they would result in a 500 error, which is less than ideal.

### Pagination

The current pages will load and display all existing data. This is just not going to scale at all. Pagination will reduce database load and increase page response times.

### View Caching

The index and upload pages could be cached forever, and the report page(s) could be cached until a new report is expired. Caching would reduce database load and increase page response times.

### Queue system

The dataset provided as example is small enough to process on the fly, but adding a queue system like Huey or Celery would be extremely helpful if the data or number or requests increases.

### Add tests

I didn't have enough time to add tests to this app, but it should probably be done soon. Adding relevant tests will prevent breaking core functionalities of the app.
