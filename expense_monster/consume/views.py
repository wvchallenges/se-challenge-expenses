from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseRedirect
from django.shortcuts import render
from django.utils import timezone

from consume.models import CSVFile, Expense
from consume.utils import import_csv_file
from django.core.management import call_command
import json, csv


def home_page(request):
    '''
    Main home page view
    '''

    if request.method == 'POST':
        # If you POST to this route we need that CSV file
        # Get the CSV file from
        # TODO: Probably would run this through a Form() one day
        # this would help while doing validation (cleaned_data)
        uploaded_file = request.FILES['csvinput']

        # Write file to tmp location
        fout = open("/tmp/%s" % uploaded_file.name, 'wb')
        for chunk in uploaded_file.chunks():
            fout.write(chunk)
        fout.close()
        call_command('eat_expenses', fout.name)

    # If request is not a POST method simply run-
    # the following block of code

    # Get all expenses total year range
    expenses = Expense.objects.all()

    # Based-off all expenses get min & max year range
    yearList = []
    for expense in expenses:
        yearList.append(expense.date.year)
    yearList = list(set(yearList))

    # Loop through months and calculate totals
    monthly_total = 0
    output = ''
    monthDict={1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}
    for year in yearList:
        current_month = 1
        while current_month <= 12:
            try:
                matching_expenses = Expense.objects.filter(
                    date__month=current_month,
                    date__year=year
                )
                for expense in matching_expenses:
                    monthly_total += (
                        expense.tax_amount + expense.pre_tax_amount
                    )
                month_data = {current_month: str(monthly_total)}
                output = output + '{} {} Total Expense ${}<br>'.format(
                    monthDict[current_month], year, monthly_total)
                current_month += 1
                monthly_total = 0
            except ObjectDoesNotExist:

                current_month += 1
        output = output + '<hr>'

    csf_files = CSVFile.objects.all()
    context = {
        'expense_report': output,
        'csfFiles': csf_files
    }
    return render(
        request,
        'home.html',
        context
    )


def remove_csv_file(request, csvfile_id):
    '''
    This view will get the posted data of the
    ID for the csv_file that is to be deleted
    and will cycle through each expense associated
    with it and delete it from the Expense Monster.
    '''
    if request.method == 'GET':
        return HttpResponseForbidden()
    elif request.method == 'POST':

        # Get source file object
        source_file = CSVFile.objects.get(pk=csvfile_id)

        # Delete all stored expenses associated with source_file
        # TO-DO: Instead of deleting the expenses and the file-
        # we should probably just use the expense.deleted boolean-
        # status
        Expense.objects.filter(source_file=source_file).delete()

        # Finally delete source file
        CSVFile.objects.get(pk=csvfile_id).delete()

        return HttpResponseRedirect('/')   
