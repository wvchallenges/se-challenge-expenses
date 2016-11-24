from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^upload/', include('upload.urls')),
    url(r'^$', RedirectView.as_view(url='/upload/list_files')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
