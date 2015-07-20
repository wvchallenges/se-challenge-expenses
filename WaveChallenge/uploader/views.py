from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.db.models import Min, Max
from .models import Record
from .forms import CsvUploadForm
from funcs import handle_uploaded_file, get_monthly_expenses


def index(request):
    records = Record.objects.all()
    return render(request, 'uploader/index.html', {'records':records})


def upload(request):
	#upload CSV, parse and save to db on POST. else show Upload form
    if request.method == 'POST':
        form = CsvUploadForm(request.POST, request.FILES)
        if form.is_valid():
            print("post form valid")
            handle_uploaded_file(request.FILES['docfile'])
            return HttpResponseRedirect('../expenses')
        else:
        	print("post form NOT valid")
    else:
        print("method not post")
        form = CsvUploadForm()
    return render(request, 'uploader/upload.html', {'form': form})


def expenses(request):
	records={}
	total = 0
	# if recordds exist in db then show them else return empty headers to render
	if Record.objects.all():
		min_date = Record.objects.aggregate(Min('date'))['date__min']
		max_date = Record.objects.aggregate(Max('date'))['date__max']
		records = get_monthly_expenses(min_date, max_date)
		total = sum(records.values())
	return render(request, 'uploader/expenses.html', {'records': records, 'total': total})