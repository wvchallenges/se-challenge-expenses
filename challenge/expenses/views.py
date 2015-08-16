from collections import defaultdict
from django.db import transaction
from django.contrib import messages
from django.shortcuts import redirect, get_object_or_404

from challenge.main.decorators import render_to
from challenge.expenses.models import Expense, Report
from challenge.expenses.forms import ReportForm
from challenge.expenses.api import process_report


@render_to('expenses/upload.html')
def upload(request):
    form = ReportForm()
    if request.method == 'POST':
        with transaction.atomic():
            form = ReportForm(request.POST, request.FILES)
            if form.is_valid():
                report = form.save()
                # This might fail depending on the file uploaded.
                # I'm using an atomic transaction to rollback everything
                # if it does. That probably should be reworked to allow
                # a nicer solution from the user's point of view
                process_report(report.id)
                messages.success(request, 'Report imported.')
                return redirect('expenses_report', report.id)
    return {'form': form}


@render_to('expenses/report.html')
def report(request, report_id):
    data = defaultdict(int)

    report = get_object_or_404(Report, id=report_id)

    for expense in Expense.objects.filter(report_id=report_id):
        data[expense.date.strftime('%Y-%m')] += expense.total

    return {
        'data': sorted(data.items(), key=lambda x: x[0]),
        'report': report,
    }


@render_to('expenses/list.html')
def list(request):
    return {'reports': Report.objects.all()}
