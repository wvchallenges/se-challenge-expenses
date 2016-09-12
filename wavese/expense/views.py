from django.shortcuts import render

from django.db import models
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.http import Http404

from .models import CSVItemReader, CSVRowToExpenseModelProcessor, ExpenseItemWriter, Job
from .models import Expense
from io import TextIOWrapper

defaultBatchInterval = 5

def index(request):
    if (request.method == 'GET'): 
        return render(request, 'expense/index.html', {})
    elif (request.method == 'POST'): 
        params = {'csvSourceId' : request.POST['csvSourceId']}
        csvItemReader = CSVItemReader(TextIOWrapper(request.FILES['expenses'].file, "utf-8"), numHeaderRows=1)
        csvRowToExpenseModelProcessor = CSVRowToExpenseModelProcessor()
        expenseItemWriter = ExpenseItemWriter()
        job = Job(csvItemReader, csvRowToExpenseModelProcessor, expenseItemWriter, 
            batchInterval=defaultBatchInterval, params=params)
        job.save()
        job.run()
        monthlyExpenses = Expense.objects.filter(job=job) \
            .annotate(truncMonth=TruncMonth('date')) \
            .values('truncMonth') \
            .annotate(preTaxAmount=Sum('preTaxAmount'), taxAmount=Sum('taxAmount'), 
                totalExpenseAmount=Sum('preTaxAmount') + Sum('taxAmount'))
        context = {'monthlyExpenses' : monthlyExpenses}
        return render(request, 'expense/monthlyExpenses.html', context)
    else:
        raise Http404()

def processBatch(batch):
    pass