from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
def upload(request):
    return HttpResponseRedirect(reverse("expense_reports:detail", args=[1]))

def detail(request, expense_report):
    return render(request, "expense_reports/detail.html")
