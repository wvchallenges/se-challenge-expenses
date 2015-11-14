from django.shortcuts import render
from django.http import HttpResponse

import csv
import json
from collections import namedtuple

def data_migrator_page(request):
    if request.method == 'GET':
        return render(request, 'data_migrator/data_migrator_page.html')

def upload_file(request):
    if request.method == 'POST':
        response_dict   = {}
        found_errors    = False
        csv_file        = request.FILES.get('csv-data-file', False)
        data            = csv_file.read()
        csv_data_set    = process_csv_file(data)

        return HttpResponse(json.dumps(response_dict), content_type='application/javascript')

def process_csv_file(csv_string):
    '''Process csv data string and return list of tuples'''
    csv_lines   = csv_string.splitlines()
    csv_reader  = csv.reader(csv_lines, delimiter=',')
    # Ingore the header
    next(csv_reader, None)

    CSVData = namedtuple(
                'CSVData',
                'date, category, emp_name, emp_address, expense_description, pre_tax_amount, tax_name, tax_amount'
                )

    csv_data_set = []

    for row in csv_reader:
        csv_data = CSVData(*row)
        csv_data_set.append(csv_data)

    return csv_data_set