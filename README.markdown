# Expense importer

## Getting started

### Notes about the installation process

#### Buildout

I use buildout to manage dependencies, it makes it very easy to get up and running. It also isolates your dependencies completely from your system, everything will be installed in the current directory.

It will also generate command line executables for all your dependencies' entry points in `bin/`. Instead for running `python manage.py <command>`, you will now run `bin/django <command>`.


#### Node

I've setup buildout to download and compile node mostly for one package, less. While this might seem like overkill for the size of this project, most apps will end up using other modules from it, like yuglify or coffeescript.

You may want to disable this to install the app faster.

  1. In `buildout.cfg`, remove `node` from the `parts` list on line 2.
  1. In `challenge/settings/base.py`, set `LESS_EXECUTABLE` to the path it can be found on your system. (Hint: `which lessc` in your terminal)


### Installation

    python bootstrap.py   # Only run the first time, it sets up bin/buildout and setuptools
    bin/buildout          # Will install all dependencies in the current directory (eggs/, parts/)
    bin/django migrate    # Run all migrations
    bin/django runserver  # Start the app server

And you're done, go to [127.0.0.1:8000](http://127.0.0.1:8000)


### Running tests

    bin/mamba --enable-coverage

A code coverage report will be generated in ``.


## Design decisions

### Django app structure

I typically will structure my django apps in 3 different files:

  - Models: Defines models, and each model contains logic related to data validation or preparation.
  - Views: Defines all views relevant to the models, and contains only logic related to the http layer or template layer. Reading POST data or formatting data to be useable easily in the template, for example.
  - API: Defines all business logic relevant to the models. Methods in `api` generally only accept python built-in types as parameters. This restriction allows for easier testing (both from unit tests and from a shell), as well as calling `api` methods from anywhere else, such as background tasks, management commands, etc.


## What's next

The following are ideas on how to improve or extend the project, ordered by biggest value for lowest engineering effort.

### Pagination

The current report page will load and display all existing data. This is just not going to scale at all. Pagination will reduce database load and increase page response times.

### View Caching

The index and upload pages could be cached forever, and the report page(s) could be cached until a new report is expired. Caching would reduce database load and increase page response times.

### Queue system

The dataset provided as example is small enough to process on the fly, but adding a queue system like Huey or Celery would be extremely helpful if the data or number or requests increases.

### More tests

More test will reduce the chances of someone breaking something they didn't think would be impacted.
