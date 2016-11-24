from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from chartit import DataPool, Chart

from .models import Document, MonthlyExpenditure
from .forms import UploadFileForm, SelectYearForm

from .file_handler import save_file_content_to_database, calculate_total_expenses_per_month, save_total_monthly_expenses_to_database
from .utils import DateHelper


def details(request, document_id):
    """
    For each CSV file, user is presented with a dropdown populated with
    potential years. Selecting a year will generate a pie chart of monthly
    expenditures.
    """

    year = None
    year_form = SelectYearForm(request.GET or None)
    year = request.GET.get('year')
    if year_form.is_valid():
        year_form.save()
    else:
        year_form = SelectYearForm()

    monthly_expenses = calculate_total_expenses_per_month(document_id)
    date_helper = DateHelper()

    # Create a DataPool with the year data we want to retrieve.
    ds = DataPool(
        series=[{
            'options': {
                'source': MonthlyExpenditure.objects.filter(
                    document=document_id, year=year)
            },
            'terms': [
                'year',
                'monthly_expenditure',
                'month',
            ]
        }]
    )

    cht_text = 'Total expenditures per month for ' + str(year) if year else ''
    cht = Chart(
        datasource=ds,
        series_options=[{
            'options': {
                'type': 'pie',
                'stacking': False
            },
            'terms': {
                'month': ['monthly_expenditure'],
            }
        }],
        chart_options={
            'title': {
                'text': cht_text
            }
        },
        x_sortf_mapf_mts=(None, date_helper.month_name, False)
    )

    # Render list page with the documents and the form
    return render(
        request,
        'upload/details.html',
        {'monthly_expenses': monthly_expenses,
         'expensechart': cht, 'year_form': year_form,
         'document_id': document_id}
    )


def list_files(request):
    """
    Lists all uploaded CSV files.
    """

    # Handle file upload
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():

            save_file_content_to_database(request.FILES['docfile'])

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('list_files'))
    else:
        form = UploadFileForm()  # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    # Render list page with the documents and the form
    return render(
        request,
        'upload/list_files.html',
        {'documents': documents, 'form': form}
    )
