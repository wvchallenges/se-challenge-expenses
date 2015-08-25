# Expense

Expense is an expenser loader that is responsible to integrate the 
new Wave's subsidiary database to internal relational database.

## Build and Install

Follow the following procedures to build and install the app

Build the pip package from the source code.
Navigate to dataimport/wave-expense directory and run the following command

 python setup.py sdist

Install the package

 pip install --user wave-expense/dist/wave-expense-0.1.tar.gz

## Quick start

1. Add "expense" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'expense',
    )

2. Include the polls URLconf in your project urls.py like this::

    url(r'^expense/', include('expense.urls')),

3. Run `python manage.py migrate` to create the polls models.

4. Start the development server and visit http://127.0.0.1:8000/expense/
   to list the monthly report.

5. Visit http://127.0.0.1:8000/expense/import to import a new csv file to
   our relational database.

## Implementation details

The main points I liked on this implementation is the independency between each layer.
I also like the UI totally independent from model and other implementations.