from django.conf.urls import url

from expense_report.views import (
    EmptyExpenseList,
    ExpenseReportUpload,
    ExpenseReportList,
)

urlpatterns = [
    url(r'^$', ExpenseReportUpload.as_view(), name='expense-report'),
    url(r'^expense-list/$', ExpenseReportList.as_view(), name='expense-list'),
    url(
        r'^empty-expense-list/$',
        EmptyExpenseList.as_view(),
        name='empty-expense-list'
    ),
]
