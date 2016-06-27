from django.shortcuts import render
from csv_parser.forms import CsvUploadForm
from csv_parser import utils

# View for getting expenses from file, and displaying results
def upload_expenses(request):
  if request.method == 'POST':
    csv_upload_form = CsvUploadForm(request.POST,request.FILES)
    if csv_upload_form.is_valid():
      csvFile = csv_upload_form.cleaned_data['file']
      # handles parsing of csv, writing to database, calculating monthly
      # totals and creation of error list
      monthly_totals, errors = utils.parse_csv_expenses(csvFile)
      # if monthly totals is nonzero length, display results with errors
      if monthly_totals:
        return render(request, 'upload_results.html',{'monthly_expenses':monthly_totals,'errors':errors})
      # if monthly totals is empty, no expenses were written, so prompt
      # user to try again in addition to providing descriptive error list
      else:
        errors.append('No expenses were written to the database, please try again.')
        return render(request, 'csv_upload.html',{'csv_form':csv_upload_form, 'errors': errors})
  # if request is not post or form is invalid, render empty submission form
  csv_upload_form = CsvUploadForm()
  return render(request,'csv_upload.html', {'csv_form':csv_upload_form})
