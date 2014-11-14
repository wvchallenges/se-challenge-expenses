from django.shortcuts import render

from forms import UploadDataFileForm
from logic import handle_uploaded_file


# Create your views here.
def upload(request):
    month_sums = {}
    if request.method == 'POST':
        form = UploadDataFileForm(request.POST, request.FILES)
        if form.is_valid():
            month_sums = handle_uploaded_file(request.FILES['file'])
    else:
        form = UploadDataFileForm()

    return render(
        request,
        'data_uploader/upload.html',
        {'form': form, 'month_sums': month_sums})
