from django.shortcuts import render
from django.http import HttpResponse
from .models import MonthlyExpense
from django.template import RequestContext, loader

def index(request):
	fields = MonthlyExpense._meta.fields
	monthlyExpense = MonthlyExpense.objects.all()

	template = loader.get_template('ExpenseCalculator/index.html')
	context = RequestContext(request,{'fields':fields,'MonthlyExpense':monthlyExpense,})
	return HttpResponse(template.render(context))
# Create your views here.
