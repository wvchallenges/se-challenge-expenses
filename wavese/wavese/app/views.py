from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.db.models import Sum, connection
from datetime import datetime
from decimal import Decimal, InvalidOperation
import csv
import codecs

from wavese.app.forms import UploadFileForm
from wavese.app.models import SubsidiaryData


def home(request):
    """
    If this page is accessed via POST,
        Read in an uploaded file, parse it as a CSV file,
            insert the data into a database, and redirect to a report page
    If this page is accessed via any other request method,
        Create an empty form that accepts an uploaded file, and render the form and some other HTML
    """
    # Handle file upload
    errors = None
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                parse_company_data(request.FILES['uploaded_file'])
                return HttpResponseRedirect(reverse('wavese.app.views.report'))
            except (IndexError, InvalidOperation, ValueError) as e:
                errors = e

    else:
        # A empty, unbound form
        form = UploadFileForm()

    # Render home page
    return render_to_response(
        'app/home.html',
        {'form': form, 'errors': errors},
        context_instance=RequestContext(request)
    )


def parse_company_data(file):
    """
    Parse an uploaded CSV file and import the data into a database.
    Assume the first line contains the headers for date, category, employee name, employee address,
    expense description, pre-tax amount, tax name, and tax amount.
    :param file: InMemoryUploaded file
    :return: None
    """
    csv_data = csv.reader(codecs.iterdecode(file, 'utf-8'), delimiter=',', quotechar='"')
    next(csv_data)
    for row in csv_data:
        company_data = SubsidiaryData(date=datetime.strptime(row[0], '%m/%d/%Y').date(),
                                      category=row[1],
                                      employee_name=row[2],
                                      employee_address=row[3],
                                      expense_description=row[4],
                                      pre_tax_amount=Decimal(row[5].strip().replace(',', '')),
                                      tax_name=row[6],
                                      tax_amount=Decimal(row[7].strip().replace(',', '')))
        company_data.save()


def report(request, filters):
    """
    Return HTML for report page
    """
    # Generate results for result page
    truncate_date = connection.ops.date_trunc_sql('month', 'date')
    filter = ''

    for key in filters:
        filter += "%s=%s" % key, filters[key]

    qs = SubsidiaryData.objects.extra({'month': truncate_date}).filters(filter)
    data = qs.values('month').annotate(Sum('tax_amount'), Sum('pre_tax_amount')).order_by('month')

    for row in data:
        row['dateMonth'] = datetime.strptime(row['month'], '%Y-%m-%d').date()
        row['total'] = row.get('tax_amount__sum') + row.get('pre_tax_amount__sum')

    return render_to_response(
        'app/report.html',
        {'data': data},
        context_instance=RequestContext(request)
    )

