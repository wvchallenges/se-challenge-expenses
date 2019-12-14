from django.template.context_processors import csrf
from django.shortcuts import render_to_response

from forms import UploadForm
from services import ExpenseService


def index(request):
    model = {
        'title': 'Expense File Upload',
        'upload': UploadForm,
    }
    model.update(csrf(request))
    return render_to_response('expenses/index.html', model)


def upload(request):
    if "expenses_file" not in request.FILES:
        model = {
            'error': 'Select a file to upload',
            'title': 'Expense File Upload',
            'upload': UploadForm,
        }
        model.update(csrf(request))
        return render_to_response('expenses/index.html', model)

    f = request.FILES["expenses_file"]
    service = ExpenseService()
    expense_report = service.read_from_file(f)

    model = {
        'title': 'Expense Report',
        'expense_report': expense_report,
    }
    return render_to_response('expenses/expense_report.html', model)
