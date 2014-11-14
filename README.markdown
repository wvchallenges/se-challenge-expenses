## Setup

1. You will need Python 2.7 and pip
1. Run `pip install -r requirements.txt` in the root folder
1. `cd wvse`
1. `python manage.py migrate`
1. `python manage.py runserver`

The application will be running at http://localhost:8000/uploader/

## Implementation

I'm particularly proud of my ExpenseUpload model and the way it relates to the Expense model. It provides an audit trail of where uploaded data came from and when,
and with further integration could provide data such as who uploaded data. Another benefit is that the report generated when the uploaded CSV is processed could be
saved in the ExpenseUpload model, or could be generated again from the database, rather than being lost as soon as the upload page is refreshed.

I'm also proud of my normalization of the Employee model, allowing for data consistency of employee's names and addresses. This will allow future changes of employee
addresses to be consistent through the entire dataset.