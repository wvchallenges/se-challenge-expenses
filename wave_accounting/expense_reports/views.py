from django.shortcuts import render

# TODO : extra feature: add multiple files?

def home(request):
    context = {}
    return render(request,'expense_reports/upload.html',context)

    # TODO import.html, drag/drop or select file button 

def display(request,expense_report):
    context = {'album_name':album_name}
    
    # TODO parse imported file

    # add each row to the database

    # compute total amounts / month 

    return render(request,'expense_reports/expense_summary.html',context)

# Extra feature
# make each month expandable to view the details, or redirect to a new month
# to do: add a color scheme per category + add totals per category (for each month and the year
