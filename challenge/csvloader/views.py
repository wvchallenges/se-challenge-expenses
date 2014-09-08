from django.core.urlresolvers import reverse
from django.shortcuts import render_to_response, get_object_or_404, redirect
from django.template import RequestContext
from django.views.generic import View

from csvloader.forms import UploadForm
from csvloader.models import Import


class UploadView(View):
    def get(self, request, form=UploadForm()):
        ctx = {
            'title': 'Upload',
            'form': form
        }
        return render_to_response('upload.html', ctx, RequestContext(request))

    def post(self, request):
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            imported = form.save(request.user)
            return redirect(reverse('show_import', args=[imported.id]))
        else:
            return self.get(request, form)


class ImportView(View):
    def get(self, request, id):
        imported = get_object_or_404(Import, id=id)
        ctx = {
            'import': imported,
            'title': 'View Import'
        }
        return render_to_response('import.html', ctx, RequestContext(request))
