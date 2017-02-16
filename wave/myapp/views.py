# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from wave.myapp.models import Document
from wave.myapp.models import Expense
from wave.myapp.forms import DocumentForm
from datetime import datetime
import csv


def list(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request)

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('list'))
    else:
        form = DocumentForm()  # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()
    # expenses = Expense.objects.all()
    # Render list page with the documents and the form
#     expense = {}
#     for document in documents:
# for expenses in  document.expense_set.all():
#     dt = expenses.date.day.replace(day=0)
#     dt
#     for monthly in expenses.date
    # expense[expenses.date] = expenses.pretax_amt+ expenses.tax_amount

    expenses = Expense.objects.raw('''SELECT id, date, strftime('%m',date) AS month_date, strftime('%Y',date) AS year_date, SUM(tax_amount+pretax_amt) AS total_amount
                                FROM myapp_expense 
                                WHERE document_id=30
                                GROUP BY year_date, month_date
                                ORDER BY date''')
        # print expenses.total_amount

# for document in documents:
# for expenses in  document.expense_set.all():
#     if expense[str(expenses.date.year)+'/'+str(expenses.date.month)]:
#         expense[str(expenses.date.year)+'/'+str(expenses.date.month)] += expenses.pretax_amt+ expenses.tax_amount
#     else:
#          expense[str(expenses.date.year)+'/'+str(expenses.date.month)] = expenses.pretax_amt+ expenses.tax_amount
        # expense[document.id] = { document.id: expense.pretax_amt+ expense.tax_amount }

    return render(
        request,
        'list.html',
        {
        'documents': documents, 
        'form': form,
        'expenses': expenses
        }
    )

def handle_uploaded_file(request):
    newdoc = Document(
        docfile=request.FILES['docfile'],
        created_time = datetime.now()
        )
    newdoc.save()


    # handle_uploaded_file(request.FILES['docfile'])
    reader = csv.DictReader(request.FILES['docfile'])
    # save_to_db(row, newdoc)
    for row in reader:
        save_to_db(row, newdoc)

def save_to_db(row, doc):
    csv_to_db = Expense(
                date = datetime.strptime(row['date'],'%m/%d/%Y' ),
                category = row['category'],
                employee_name  = row['employee name'],
                employee_address = row['employee address'],
                expense_desc = row['expense description'], 
                pretax_amt = amount_formatter(row['pre-tax amount']),
                tax_name = row['tax name'], 
                tax_amount = amount_formatter(row['tax amount']),
                document = doc
                )
    csv_to_db.save()

