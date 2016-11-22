from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect
from django.db.models import Sum
from .forms import ExpenseReportForm
from .models import Expense
from datetime import datetime
from decimal import Decimal
import csv
import calendar

def expense_report_file_handler(expense_report_object):
    with open(expense_report_object.report.path, "r") as csv_file:
        expense_reader = csv.DictReader(csv_file)
        for expense in expense_reader:
            expense_report_object.expense_set.create(
                date=datetime.strptime(expense["date"], "%m/%d/%Y").date(),
                category=expense["category"],
                employee_name=expense["employee name"],
                employee_address=expense["employee address"],
                expense_description=expense["expense description"],
                pretax_amount=Decimal(
                    expense["pre-tax amount"].replace(",","")
                ),
                tax_amount=Decimal(
                    expense["tax amount"].replace(",","")
                ),
                tax_name=expense["tax name"]
            )

def upload(request):

    if request.method == "POST":
        form = ExpenseReportForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.save()
            expense_report_file_handler(file)
            return redirect(file)
        else:
            return redirect(reverse("homepage"))
    else:
        return redirect(reverse("homepage"))

def detail(request, expense_report):
    monthly_totals = []

    expenses = Expense.objects.filter(expense_report=expense_report)
    for month in range(1, 13):
        expenses_by_month = expenses.filter(date__month=month)
        pretax_amount = expenses_by_month\
            .aggregate(Sum("pretax_amount"))["pretax_amount__sum"]
        tax_amount = expenses_by_month\
            .aggregate(Sum("tax_amount"))["tax_amount__sum"]
        if pretax_amount:
            monthly_totals.append({
                "name": calendar.month_name[month],
                "pretax_amount": pretax_amount,
                "tax_amount": tax_amount,
                "total": pretax_amount + tax_amount
            })

    return render(
        request,
        "expense_reports/detail.html",
        {"monthly_totals": monthly_totals}
    )
