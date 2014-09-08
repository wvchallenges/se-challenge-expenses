from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.views.generic import View

from csvloader.models import Import


class UploadView(View):
    def get(self, request):
        ctx = {
            'title': 'Upload'
        }
        return render_to_response('upload.html', ctx, RequestContext(request))

class ImportView(View):
    def get(self, request, id):
        imported = get_object_or_404(Import, id=id)
        ctx = {
            'import': imported,
            'title': 'View Import'
        }
        return render_to_response('import.html', ctx, RequestContext(request))
