from django.shortcuts import render

from django.http import Http404
from django.http.response import HttpResponse

from .models import CSVItemReader
from io import TextIOWrapper

batchInterval = 5

def index(request):
    if (request.method == 'GET'): 
        return render(request, 'expense/index.html', {})
    elif (request.method == 'POST'): 
        csvItemReader = CSVItemReader(TextIOWrapper(request.FILES['expenses'].file, "utf-8"), numHeaderRows=1)
        batch = []
        for row in csvItemReader:
            batch.append(row)
            if (len(batch) >= batchInterval):
                processBatch(batch)
                batch = []
        processBatch(batch)
        return HttpResponse(batch)
    else:
        raise Http404()

def processBatch(batch):
    pass