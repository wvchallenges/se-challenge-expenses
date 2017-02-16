# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from wave.myapp.models import Document
from wave.myapp.models import Expense
from wave.myapp.forms import DocumentForm
from wave.myapp.utils import handle_uploaded_file
from datetime import datetime
import csv


def upload(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request)

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('upload'))
    else:
        form = DocumentForm()  # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    # Render list page with the documents and the form

    expenses = Expense.objects.raw('''SELECT id, date, 
                                strftime('%m',date) AS month_date, 
                                strftime('%Y',date) AS year_date, 
                                SUM(tax_amount+pretax_amt) AS total_amount
                                FROM myapp_expense 
                                WHERE document_id=3
                                GROUP BY year_date, month_date
                                ORDER BY date''')

    return render(
        request,
        'upload.html',
        {
        'documents': documents, 
        'form': form,
        'expenses': expenses
        }
    )