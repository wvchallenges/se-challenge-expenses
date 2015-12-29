import csv
from datetime import datetime

from models import Expenses, Employee


class ExpenseService:

    def __init__(self):
        self.expense_report = {}

    def read_from_file(self, f):
        r = csv.DictReader(f)

        for row in r:
            employee = Employee(name=row['employee name'], addr=row['employee address'])
            employee.save()
            date = datetime.strptime(row['date'], "%m/%d/%Y")
            category = row['category']
            desc = row['expense description']
            pre_tax_amt = float(row['pre-tax amount'].replace(',', ''))
            tax_type = row['tax name']
            tax_amt = float(row['tax amount'].replace(',', ''))

            expense = Expenses(
                date=date,
                category=category,
                desc=desc,
                employee=employee,
                pre_tax_amt=pre_tax_amt,
                tax_type=tax_type,
                tax_amt=tax_amt
            )
            expense.save()

            date = "%s/%s" % (date.month, date.year)
            tax = float("{0:.2f}".format(pre_tax_amt + tax_amt))

            v = self.expense_report[date] + tax if date in self.expense_report else tax
            self.expense_report[date] = v
        return self.expense_report
