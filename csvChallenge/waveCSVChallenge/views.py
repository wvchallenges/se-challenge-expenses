import csv
import datetime
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from io import TextIOWrapper
from decimal import Decimal
from .models import *

# Serves up the hompage of the application
def index(request):
    return render(request, 'waveCSVChallenge/index.html')

# Returns the month-year total of all expenses in the database, Could
# implement latest CSV data and Cache result into memory to save the query
def expenseDetail(request):
    # RAW SQL to get the total_amount per month-year, not in love with this
    # way, could be better, especially the primary key id work around
    expensesByMonth = Expenses.objects.raw(
        "SELECT SUM(total_amount) AS monthTotal, strftime('%m-%Y', date) AS 'id' FROM waveCSVChallenge_Expenses GROUP BY strftime('%m-%Y', date);")
    return render(request, 'waveCSVChallenge/expensesByMonth.html', {'expensesByMonth': expensesByMonth})

# Gets the CSV file and calls the saveExpense method for each record
def uploadCSV(request):
    if request.POST and request.FILES:
        csvfile = TextIOWrapper(
            request.FILES['csvFile'].file, encoding=request.encoding)
        expensesLog = csv.DictReader(csvfile)
        for row in expensesLog:
            saveExpense(row)
        csvfile.close()
    return expenseDetail(request)

# Handles the saving of each record from the expense log
def saveExpense(row):
    # Using get_or_create to see if the employee, category and tax already
    # exist
    employee, created = Employees.objects.get_or_create(
        full_name=row["employee name"],
        address=row["employee address"])
    category, created = ExpenseCategories.objects.get_or_create(
        category_name=row["category"])
    # Could have calculated the tax rate as well, which is done in other firms
    # but couldn't depend on the sample data
    tax, created = TaxInformation.objects.get_or_create(
        tax_name=row["tax name"])

    # Calculating the total_amount of the expense. Saving having to calculate
    # when reading.
    pretax_amount = float(row["pre-tax amount"].replace(',', ''))
    tax_amount = float(row["tax amount"].replace(',', ''))
    total_amount = pretax_amount + tax_amount

    # Create and save the new expense; Pretty neat that I put the object of
    # the model and not the id
    newExpense = Expenses(
        category=category,
        employee=employee,
        tax=tax,
        date=datetime.datetime.strptime(
            row["date"], "%m/%d/%Y").strftime("%Y-%m-%d"),
        description=row["expense description"],
        pre_tax_amount=pretax_amount,
        tax_amount=tax_amount,
        total_amount=total_amount)
    newExpense.save()
