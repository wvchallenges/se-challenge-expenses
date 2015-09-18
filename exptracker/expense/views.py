from django.shortcuts import render
from models import Expense

# Create your views here.
def index(request):
    expenses = Expense.objects.all()
    return render(request, 'index.html', {'expenses': expenses})

def purge(request):
    Expense.objects.all().delete()
    return render(request, 'purge.html')

def api(request):
    return render(request, 'api_index.html')    