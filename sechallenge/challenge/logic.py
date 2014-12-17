import csv
from io import StringIO

from .models import Employee, Expense


def parse_fd(fd):
    """Open file upload FD and parse CSV  data in it"""
    str_fd = StringIO(fd.read().decode(encoding='UTF-8'))
    csv_reader = csv.reader(str_fd)
    for row in csv_reader:
        yield row


def update_db(data):
    for row in [[y.strip() for y in x] for x in data]:
        process_record(row)


def process_record(row):
    def employee_info(row):
        return {'name': row[2], 'address': row[3]}

    def expense_info(row):
        def clean_floats(in_str):
            return "".join([
                x for x in in_str
                if x.isdigit() or x == '.'
            ])

        return {
            'date': row[0],
            'category': row[1],
            'description': row[4],
            'pre_tax': float(clean_floats(row[5])),
            'tax_type': row[6],
            'tax_amount': float(clean_floats(row[7]))
        }

    def employee_found(emp):
        try:
            emp = Employee.objects.filter(**emp)
            return emp.objects[0].id
        except AttributeError:
            return False

    def expense_add(exp):
        Expense(
            employee=exp['employee'],
            date=exp[da]

        )

    employee = employee_info(row)
    expense = expense_info(row)
    emp_id = employee_found(employee)
    if not emp_id:
        emp = Employee(**employee)
        emp.save()
        emp_id = emp.id

    expense['employee'] = emp_id
