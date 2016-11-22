from django.shortcuts import render
from expense_reports.forms import ExpenseReportForm


def homepage(request):
    form = ExpenseReportForm()
    print(form)
    return render(request, "index.html", {"form": form})
