from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from forms import UploadFileForm
import csv
from expense.models import Employee, Expense, Category
import datetime


# Create your views here.
def index(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid() and str(request.FILES['file']).endswith('.csv'):
            num_success, num_failed = process_csv(request.FILES['file'])
            return render(request,
                          'upload_index.html',
                          {'form': form, 'success': '1',
                           'num_success': num_success,
                           'num_failed': num_failed}
                          )
        return render(request,
                      'upload_index.html',
                      {'form': form, 'success': '0'}
                      )
    else:
        form = UploadFileForm()
    return render(request, 'upload_index.html', {'form': form})


def process_csv(f):
    skipped = False
    num_success = 0
    num_failed = 0
    # turn file into list of entries, skipping the header
    csvfile = next(f.chunks()).split('\n')[1:]
    entries = csv.reader(csvfile, delimiter=',', quotechar='"')
    for entry in entries:
        if is_valid_entry(entry):
            num_success += 1
            insert_entry(entry)
        else:
            num_failed += 1
    return num_success, num_failed


def is_valid_entry(entry):
    # short circuited empty column check per line
    has_empty_lines = any(not i for i in entry)
    # column count check
    if is_number(entry[5]) is False or is_number(entry[7]) is False:
        return False

    if len(entry) == 8 and has_empty_lines is False:
        return True
    return False


def is_number(s):
    try:
        float(s.replace(',', ''))
        return True
    except ValueError:
        return False


def insert_entry(entry):
    name = entry[2].split()
    first, last = name[0], name[1]
    employee = Employee.objects.get_or_create(first_name=first,
                                              last_name=last,
                                              address=entry[3])
    category = Category.objects.get_or_create(name=entry[1])
    expense = Expense(description=entry[4],
                      date=datetime.datetime.strptime(entry[0], "%m/%d/%Y"),
                      pretax=entry[5].replace(',', ''),
                      tax=entry[7].replace(',', ''),
                      taxname=entry[6],
                      category=category[0],
                      employee=employee[0]
                      ).save()


@csrf_exempt
def api(request):
    if str(request.FILES['file']).endswith('.csv'):
        num_success, num_failed = process_csv(request.FILES['file'])
        return JsonResponse({'success': '1',
                             'num_success': num_success,
                             'num_failed': num_failed}
                            )
    else:
        return JsonResponse({'success': '0'})
