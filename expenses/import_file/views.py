from django.core.context_processors import csrf
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, render_to_response
from django.template import RequestContext, loader


from .file_handler import FileHandler
from .forms import UploadFileForm
from .models import Expenses


def index(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = FileHandler(request.FILES['form_file'])
            uploaded_file.parse_uploaded_file()
            request.session['filename'] = request.FILES['form_file'].name
            request.session['file_id'] = uploaded_file.file_object.id
            return HttpResponseRedirect('upload_results')
    else:
         form = UploadFileForm()
    context = {'form': form}
    context.update(csrf(request))
    return render_to_response('import_file/index.html', context)

def upload_results(request):
    monthly = Expenses.get_monthly_expenses(request.session['file_id'])
    context = {'monthly': monthly}
    context.update({'filename': request.session['filename']})
    return render_to_response('import_file/upload_results.html', context)
