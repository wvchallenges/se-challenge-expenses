from django.shortcuts import render
from .forms import ExpenseForm
from .services.parsing import exp_file_parser
from .services.expense import get_monthly_expenses, save_expenses


def index(request):
    return render(request, 'subsidiary/index.html')


def upload(request):
    if request.method == 'POST':
        form = ExpenseForm(request.POST, request.FILES)
        if form.is_valid():
            expenses = exp_file_parser(form.cleaned_data["expfile"])
            save_expenses(expenses)
            monthly_exp = get_monthly_expenses(expenses)
            return render(request, 'subsidiary/upload.html',
                          {'form': form, 'monthly_exp': sorted(monthly_exp.items())})

    form = ExpenseForm()
    return render(request, 'subsidiary/upload.html', {'form': form})


