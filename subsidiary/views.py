from django.shortcuts import render
from .forms import ExpenseUploadForm

def expense_upload(request):
    form = ExpenseUploadForm(request.POST or None, request.FILES or None)
    
    if form.is_valid():
        form.upload()
        
    return render(request, 'subsidiary/expense_upload.html', {'form': form})