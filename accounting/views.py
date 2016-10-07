from django.shortcuts import render
from .forms import UploadFileForm

from .helpers.processCSV import process_csv
from .helpers.loadExistingRecords import get_expenses

def index(request):

    # Get existing expenses to show them on UI.
    results = get_expenses()

    if request.method == 'POST':

        form = UploadFileForm(request.POST, request.FILES)
        
        # Get uploaded file, parse the .csv and add data to the relational database.
        process_csv(request.FILES['file'])

        # Compute stats and return as an HTML table.
        results = get_expenses()

        # Send response to client that includes the results.
        return render(request, 'accounting/home.html', {
            'expenses': results
        })

    # Test if any expenses exist. If yes, send them to client as a HTML table.
    if results:
        return render(request, 'accounting/home.html', {'expenses': results})

    # Else, send normal response.
    else:
        return render(request, 'accounting/home.html')
