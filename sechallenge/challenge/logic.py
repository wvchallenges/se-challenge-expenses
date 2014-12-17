import csv
from io import StringIO


def parse_fd(fd):
    """Open file upload FD and parse CSV  data in it"""
    str_fd = StringIO(fd.read().decode(encoding='UTF-8'))
    csv_reader = csv.reader(str_fd)
    for row in csv_reader:
        yield row


def update_db(data):
    def employee_info(row):
        return {'name': row[2], 'address': row[3]}

    def expense_info(row):
        return {
            'date': row[0],
            'category': row[1],
            'desc': row[4],
            'pre_tax': float(row[5]),
            'tax_type': row[6],
            'tax_amount': float(row[7])
        }
    for row in data:
        employee = employee_info(row)
        expense = expense_info(row)
        import ipdb; ipdb.set_trace()
