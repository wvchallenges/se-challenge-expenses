from django.shortcuts import render
from .forms import FileForm
from django.http import HttpResponse, HttpResponseRedirect
from .importer import import_csv_expenses
from .models import Expense
from django.db import connection
from django.contrib import messages


# TODO: show error/success messages
def expenses_list(request):
    # get expenses by month
    cursor = connection.cursor()
    cursor.execute("select expense_date, sum(total_amount) from expenses_expense group by date(expense_date, 'start of month') order by expense_date")
    expenses = cursor.fetchall()
    print expenses

    return render(request, 'list.html', {'monthly_expenses': expenses})


# TODO: pass back error/success messages
def expenses_add(request):
    if request.method == 'POST':
        form = FileForm(request.POST, request.FILES)
        if form.is_valid():
            import_csv_expenses(request.FILES['file'])
            messages.add_message(request, messages.SUCCESS, 'File imported.')
            return HttpResponseRedirect('/expenses/')

    messages.add_message(request, messages.WARNING, 'WARNING: File import failed.')
    return HttpResponseRedirect('/expenses/')
