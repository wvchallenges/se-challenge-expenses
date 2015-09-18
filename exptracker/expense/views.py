from django.shortcuts import render
from models import Expense


def index(request):
    expenses = Expense.objects.all()
    monthly_summary = [0]*12

    for i in expenses:
        month = i.date.month-1
        amount = round(float(i.pretax) + float(i.tax), 2)
        monthly_summary[month] += amount
    return render(request, 'index.html',
                  {'expenses': expenses,
                   'monthly_summary': enumerate(monthly_summary)}
                  )


def purge(request):
    Expense.objects.all().delete()
    return render(request, 'purge.html')


def api(request):
    return render(request, 'api_index.html')
