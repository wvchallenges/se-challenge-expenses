import csv
from datetime import datetime

from . import models as consumer


# Create aliases for column indices
(DATE,
 CATEGORY,
 EMPLOYEE_NAME,
 EMPLOYEE_ADDRESS,
 DESCRIPTION,
 PRETAX_AMOUNT,
 TAX_NAME,
 TAX_AMOUNT) = range(0, 8)


class CSVMigrator(object):
    """
    Migrates CSV lines to consumer model data.

    Args:
        lines (iterable): an iterable of comma-separated data.

    """
    def __init__(self, csvfile):
        self._csvfile = csvfile
        self._category_cache = {}
        self._employee_cache = {}

    def get_expense_date(self, original_date):
        parsed_date = datetime.strptime(original_date, '%m/%d/%Y')
        return datetime.strftime(parsed_date, '%Y-%m-%d')

    def get_category(self, name):
        # Name comes little endian
        name_parts = name.split(" - ")
        # Switch to big endian
        name_parts.reverse()
        category_name = name_parts.pop()
        subcategory_name = name_parts.pop() if name_parts else ''
        try:
            return self._category_cache[(category_name, subcategory_name)]
        except KeyError:
            category, _ = consumer.ExpenseCategory.objects.get_or_create(name=category_name,
                                                                         subcategory=subcategory_name)
            self._category_cache[(category.name, category.subcategory)] = category
            return category

    def get_employee(self, name, address):
        try:
            return self._employee_cache[name]
        except KeyError:
            try:
                employee = consumer.Employee.objects.get(name=name)
            except consumer.Employee.DoesNotExist:
                employee = consumer.Employee.objects.create(name=name, address=address)
            self._employee_cache[employee.name] = employee
            return employee

    def get_sanitized_amount(self, formatted_amount):
        sanitized_amount = formatted_amount.replace(',', '')
        return sanitized_amount

    def create_expense(self, expense_date, employee, category, description, pretax_amount, tax_name, tax_amount):
        consumer.Expense.objects.create(charged_on=expense_date,
                                        employee=employee,
                                        category=category,
                                        description=description,
                                        pretax_amount=pretax_amount,
                                        tax_name=tax_name,
                                        tax_amount=tax_amount)

    def migrate(self):
        reader = csv.reader(self._csvfile)
        # Skip header row
        reader.next()
        # Proceed through data rows
        for row in reader:
            self.create_expense(expense_date=self.get_expense_date(row[DATE]),
                                employee=self.get_employee(row[EMPLOYEE_NAME], row[EMPLOYEE_ADDRESS]),
                                category=self.get_category(row[CATEGORY]),
                                description=row[DESCRIPTION],
                                pretax_amount=self.get_sanitized_amount(row[PRETAX_AMOUNT]),
                                tax_name=row[TAX_NAME],
                                tax_amount=self.get_sanitized_amount(row[TAX_AMOUNT]))
