from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from .forms import CSVUpload
from .logic import parse_fd, update_db


def csv_upload(request):
    context = {}
    context.update(csrf(request))
    if request.method == "POST":
        context['form'] = CSVUpload(request.POST, request.FILES)
        if context['form'].is_valid():
            data_dict = context['form'].cleaned_data
            parsed_data = parse_fd(data_dict['csv_file'])
            parsed_data.__next__()
            update_db(parsed_data)
            return HttpResponseRedirect('/total')
    else:
        context['form'] = CSVUpload()

    return render_to_response('challenge/upload.html', context)


def total_expenses(requrest):
    return render(requrest, 'challenge/expense_report.html', {})
