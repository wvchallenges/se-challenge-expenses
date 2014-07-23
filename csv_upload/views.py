from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.core.urlresolvers import reverse
from csv_upload.models import Expense
from django.db.models import Sum
import logging
import collections
#from django.contrib.auth.decorators import login_required

from .forms import UploadFileForm
from .csv_importer import csv_2_sql
logger = logging.getLogger(__name__)

#@login_required
def thanks(request):
    sum_cost = collections.OrderedDict()
    # compute the expense per month
    for unique_month in Expense.objects.dates('spend_date', 'month'):
        sum_cost[unique_month.strftime("%Y-%m")] = Expense.objects.filter(spend_date__year=unique_month.year, spend_date__month=unique_month.month).aggregate(Sum('pretax_amount'))['pretax_amount__sum']
    return render(request, "csv_upload/results.html", {"sum_cost":sum_cost, "results": Expense.objects.all()})

#@login_required
def upload_handler(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
             csv_2_sql(request.FILES['csvfile'])
             return HttpResponseRedirect('thanks')
    else:
        form = UploadFileForm()
    return render(request, 'csv_upload/upload_file.html', {'form': form})


