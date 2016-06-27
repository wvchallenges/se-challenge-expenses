from csv_parser.models import Employee, Expense
from django.core.exceptions import ValidationError
from decimal import Decimal,InvalidOperation
import datetime
import csv
def parse_csv_expenses(file):
  # objects for storing monthly total expenses and parsing errors
  monthly_totals = {}
  errors = []

  # ensure file offset is at 0th byte and get csv dialect
  file.seek(0)
  try:
    csv_dialect = csv.Sniffer().sniff(file.read(1024))
  except csv.Error, err:
    errors.append('Error in syntax of header line: %s' % err)
    return monthly_totals,errors
  file.seek(0)

  # parse csv into dictionary
  csv_data = csv.DictReader(file, dialect=csv_dialect)
  
  # loop through dictionary
  for record in csv_data:
    # get dictionary values
    # according to project description, each field will always be present
    # so no need to check if key is present in dict
    employee_name = record['employee name']
    employee_address = record['employee address']
    expense_date = record['date']
    expense_category = record['category']
    expense_description = record['expense description']
    expense_pre_tax_amount = record['pre-tax amount']
    expense_tax_name = record['tax name']
    expense_tax_amount = record['tax amount']
    emp = Employee(name=employee_name,address=employee_address)
    
    # validate employee fields
    try:
      emp.full_clean()

      # check if employee is created, so we dont have dups
      try:
        existing_emp = Employee.objects.get(name=employee_name,address=employee_address)  
        emp = existing_emp
      # if employee does not exist, create it
      except Employee.DoesNotExist:   
        emp.save()

      # convert date and decimal fields
      try:
        converted_date = datetime.datetime.strptime(expense_date,'%m/%d/%Y')
        converted_pre_tax = Decimal(expense_pre_tax_amount.replace(',',''))
        converted_tax = Decimal(expense_tax_amount.replace(',',''))
        
        emp_expense = Expense(date=converted_date,\
          category=expense_category,\
          description=expense_description,\
          pre_tax_amount=converted_pre_tax,\
          tax_name=expense_tax_name,\
          tax_amount=converted_tax,\
          employee=emp)
        # validate expense fields
        try:
          emp_expense.full_clean()
          emp_expense.save()
          # get month and year of expense and aggregate monthly expenses by summing
          expense_month_string = '%s/%s' % (converted_date.month,converted_date.year)
          if(expense_month_string in monthly_totals):
            monthly_totals[expense_month_string] += (converted_pre_tax + converted_tax)
          else:
            monthly_totals[expense_month_string] = (converted_pre_tax + converted_tax)
        except ValidationError, err:
          errors.append('Expense, %s, is invalid: %s. Cannot create expense.' % (emp_expense,err))
      except (ValueError,InvalidOperation), err:
         errors.append('Expense arguments are in invalid format: %s. Cannot create expense.' % err)
    except ValidationError, err:
      errors.append('Employee, %s, is invalid: %s. Cannot create employee or associated expense.' % (emp,err))
  return monthly_totals,errors  
  
