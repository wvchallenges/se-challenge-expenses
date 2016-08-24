import codecs
import csv
import datetime

from expense_report.models import ExpenseReport, Employee, Category
from expense_report.forms import CategoryForm, EmployeeForm, ExpenseReportForm


class CSVHandler(object):

    def __init__(self, expense_report):
        self.expense_report = expense_report
        self.parse_expense_report()

    def _clean_csv_data(self, data):
        '''
        Do the basic clean up for the CVS fields.
        Args:
            data (dict): A dict containing row data from csv file.
        Returns:
            dict: Clean data dictionary.
        '''
        row_data = data
        row_data['date'] = (
            datetime.datetime.strptime(row_data['date'], "%m/%d/%Y"))

        row_data['pre_tax_amount'] = (
            row_data['pre_tax_amount'].replace(',', ''))

        row_data['tax_amount'] = row_data['pre_tax_amount'].replace(',', '')

        return row_data

    def validate_row_data(self, row_data):
        '''
        Validate Employee, Category and ExpenseReport forms.
        Args:
            data (dict): A dict containing row data from csv file.
        Returns:
            dict: Clean data dictionary or False if form was invalid
        '''
        employee = None
        category = None
        clean_csv_data = self._clean_csv_data(row_data)

        employee_form = EmployeeForm({
            'name': clean_csv_data['employee_name'],
            'address': clean_csv_data['employee_address'],
        })

        category_form = CategoryForm({'name': clean_csv_data['category']})

        if employee_form.is_valid() and category_form.is_valid():
            employee, __ = Employee.objects.get_or_create(
                name=clean_csv_data['employee_name'],
                address=clean_csv_data['employee_address'])

            category, __ = Category.objects.get_or_create(
                name=clean_csv_data['category'])

            clean_csv_data.pop('employee_name', None)
            clean_csv_data.pop('employee_address', None)
            clean_csv_data['category'] = category.id
            clean_csv_data['employee'] = employee.id
            expense_form = ExpenseReportForm(clean_csv_data)

            # If form is valid return cleaned row data from the csv file.
            if expense_form.is_valid():
                return expense_form.cleaned_data

        return False

    def parse_expense_report(self):
        '''
        Parses the CSV file one row at a time.
        Also validates row data.
        '''
        bulk_row_list = []
        file = self.expense_report

        file.seek(0)
        data = csv.DictReader(codecs.iterdecode(file, 'utf-8'))
        data.fieldnames = [
            k.lower().replace(' ', '_').replace('-', '_')
            for k in data.fieldnames
        ]

        for row in data:
            valid_row = self.validate_row_data(row)
            if valid_row:
                bulk_row_list.append(ExpenseReport(**valid_row))

        ExpenseReport.objects.bulk_create(bulk_row_list)
