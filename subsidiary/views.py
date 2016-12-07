from django.shortcuts import render
from .forms import ExpenseUploadForm
from .services import *

def expense_upload(request):
    form = ExpenseUploadForm(request.POST or None, request.FILES or None)
    monthly_expenses = {}
    
    if form.is_valid():
        clear_database()
        form.upload()
        monthly_expenses = get_monthly_expenses()
        
    return render(
        request, 'subsidiary/expense_upload.html', {
            'form': form, 
            'monthly_expenses' : monthly_expenses, 
            'months' : get_months()
        }
    )