from django.conf.urls import patterns, url

urlpatterns = patterns('expenses.views',
    url(r'^upload/$', 'expense_upload', name='expense_upload'),
    url(r'^list/$', 'expense_list', name='expense_list'),
    url(r'^monthly_summary/$', 'expense_monthly_summary', name='expense_monthly_summary'),
    url(r'^help/$', 'expense_help', name='expense_help'),
)
