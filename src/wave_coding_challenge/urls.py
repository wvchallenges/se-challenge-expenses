from django.conf.urls import url, include
from django.contrib import admin
from .views import homepage

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^expense-report/',
        include("expense_reports.urls",
        namespace="expense_reports"
        )),
    url(r'^$', homepage, name="homepage"),
]
