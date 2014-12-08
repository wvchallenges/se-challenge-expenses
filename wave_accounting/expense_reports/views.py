from django.shortcuts import render

from .forms import UploadFileForm

from models import Expense

# TODO : extra feature: add multiple files?


def upload(request):
    
    if request.method == 'GET':

        return render(request,'expense_reports/upload.html') # TODO use context to add an error message
    
    elif request.method == 'POST':
       
        context = {'success': True }
        f = request.FILES['fileselect']
        parse_file(f)

        return render(request,'expense_reports/summary.html',context)
        


def parse_file(expenses):
    # TODO there may be a more ellegant/efficient way of skipping the first line)
    # alternate, readline, then while has next == true, read line
    
    for i,line in enumerate(expenses):
        if i != 0: ## skip header line
            
            values = line.split(",")
            
            expense=Expense(
                    date = values[0],
                    category = values[1],
                    name = values[2],
                    address = values[3],
                    description = values[4],
                    pretax_amount = values[5],
                    tax_name = values[6],
                    tax_amount = values[7]
                    )
            expense.save()
            print values



        # TODO import.html, drag/drop or select file button 

        # TODO add progress bar


# Extra feature
# make each month expandable to view the details, or redirect to a new month
# to do: add a color scheme per category + add totals per category (for each month and the year
