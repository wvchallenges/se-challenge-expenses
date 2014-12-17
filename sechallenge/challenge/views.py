from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from .forms import CSVUpload


def csv_upload(request):
    context = {}
    context.update(csrf(request))
    if request.method == "POST":
        context['form'] = CSVUpload(request.POST, request.FILES)
        if context['form'].is_valid():
            return HttpResponseRedirect('/total')
    else:
        context['form'] = CSVUpload()

    return render_to_response('challenge/upload.html', context)


def total_expenses(requrest):
    return render(requrest, 'challenge/expense_report.html', {})
