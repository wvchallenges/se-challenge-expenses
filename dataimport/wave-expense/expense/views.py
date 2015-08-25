from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect

from .models import Expense, Category, Employee
from .forms import UploadFileForm

def index(request):
	monthly_expense = Expense.month_report()
	context = {'monthly_expense': monthly_expense}
	return render(request, 'expense/monthly_expense.html', context)

def loadfile(request):
	if request.method == 'POST':
		form = UploadFileForm( request.POST, request.FILES )
		if form.is_valid():
			Expense.loadfile(request.FILES['file'])
			return HttpResponseRedirect('/expense/')
		print form.is_valid()
	else:
		form = UploadFileForm()
	return render( request, 'expense/upload.html', {'form': form} )