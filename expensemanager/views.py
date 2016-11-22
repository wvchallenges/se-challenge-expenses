from django.shortcuts import render
from .forms import UploadFileForm

from csvhandler import handle_csv_file


def upload_file(request):
    expense_per_month = []
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            expense_per_month = handle_csv_file(request.FILES['file'])
            form.fields['file'].label = "You can upload another CSV File"
    else:
        form = UploadFileForm()
    return render(request, 'file_upload.html', {'form': form, 'expense_per_month': expense_per_month})
