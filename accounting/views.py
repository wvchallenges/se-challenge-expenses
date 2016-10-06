from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from .forms import UploadFileForm

from .helpers.processCSV import process_csv

def index(request):
    return render(request, 'accounting/upload.html')

def upload(request):

    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)

        if form.is_valid():
            process_csv(request.FILES['file'])
            return render(request, 'accounting/upload.html')

        else:
            toastr.error('Something wen\'t wrong. Please try again later.')
    else:
        form = UploadFileForm() 

    return render(request, 'accounting/upload.html', {'form': form})


# Create your views here.
