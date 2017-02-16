from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from wave.myapp.views import list

from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^myapp/', include('wave.myapp.urls')),
    url(r'^$', list, name='list')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
