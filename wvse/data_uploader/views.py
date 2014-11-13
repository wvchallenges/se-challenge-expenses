from django.shortcuts import render

from forms import UploadDataFileForm


# Create your views here.
def upload(request):
    if request.method == "POST":
        form = UploadDataFileForm(request.POST, request.FILES)
        if form.is_valid():
            # TODO: handle form
            pass
    else:
        form = UploadDataFileForm()

    return render(request, 'data_uploader/upload.html', {'form': form})
