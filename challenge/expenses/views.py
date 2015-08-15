from collections import defaultdict
from django.db import transaction
from django.shortcuts import redirect

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
                # This might fail. Errors are not handled yet,
                # but the transaction prevents partial imports
                process_report(report.id)
                return redirect('expenses_report', report.id)
    return {'form': form}


@render_to('expenses/report.html')
def report(request, report_id=None):
    data = defaultdict(int)

    # Optional restriction on single report
    report = None
    qs = Expense.objects.all()
    if report_id:
        qs = qs.filter(report_id=report_id)
        report = Report.objects.get(id=report_id)

    for expense in qs:
        data[expense.date.strftime('%Y-%m')] += expense.total

    return {
        'data': sorted(data.items(), key=lambda x: x[0]),
        'report': report,
    }
