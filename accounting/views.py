from django.shortcuts import render
from django.http import HttpResponse
from .forms import UploadFileForm
import pandas
import numpy


def index(request):
    return render(request, 'accounting/upload.html')

def upload(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            temp(request.FILES['file'])
            return HttpResponseRedirect('/success/url/')
    else:
        form = UploadFileForm()
    return render(request, 'accounting/upload.html', {'form': form})


def temp(f):
	
	k = pandas.DataFrame(f)

	return render(request, 'accounting/upload.html', {'form': form})



# Create your views here.
