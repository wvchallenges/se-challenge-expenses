from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from .forms import CSVUpload


def csv_upload(request):
    form = None
    if request.method == "POST":
        form = CSVUpload(request.POST, request.FILES)
        if form.is_valid():
            return HttpResponseRedirect('/total_expenses')
    else:
        form = CSVUpload()
    context = {form: 'form'}
    context.update(csrf(request))
    return render_to_response('challenge/upload.html', context)


def total_expenses(requrest):
    return render(requrest, 'challenge/expense_report.html', {})
