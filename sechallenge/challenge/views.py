from django.db.models import Min, Max

from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from .forms import CSVUpload
from .logic import parse_fd, update_db, produce_month_dates
from .models import Expense


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
    max_date = Expense.objects.filter(recent_data=True).aggregate(Max('date'))
    min_date = Expense.objects.filter(recent_data=True).aggregate(Min('date'))
    max_date = max_date['date__max']
    min_date = min_date['date__min']
    print("")
    print("Min Date ", min_date)
    print("Max Date ", max_date)
    intervals = [
        (month_begin, month_end)
        for month_begin, month_end in produce_month_dates(min_date, max_date)
    ]
    intervals[0] = (min_date, intervals[0][1], )
    intervals[-1] = (intervals[-1][0], max_date)
    print(intervals)
    import ipdb; ipdb.set_trace()
    return render(requrest, 'challenge/expense_report.html', {})
