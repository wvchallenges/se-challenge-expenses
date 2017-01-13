from django.conf.urls import url
from .views import Index, ProcessExpenseFile


urlpatterns = [
    url(r'^$', Index.as_view(), name='index'),
    url(r'^process_expense_file', ProcessExpenseFile.as_view(), name='process_expense_file'),
]
