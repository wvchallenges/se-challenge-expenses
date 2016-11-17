import csv

from . import models as consumer


# Create aliases for column indices
(DATE,
 CATEGORY,
 EMPLOYEE_NAME,
 EMPLOYEE_ADDRESS,
 DESCRIPTION,
 PRETAX_AMOUNT) = range(0, 6)


class CSVMigrator(object):
    """
    Migrates CSV lines to consumer model data.

    Args:
        lines (iterable): an iterable of comma-separated data.

    """
    _employee_cache = {}

    def __init__(self, csvfile):
        self._csvfile = csvfile

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

    def migrate(self):
        reader = csv.reader(self._csvfile)
        # Skip header row
        reader.next()
        # Proceed through data rows
        for row in reader:
            employee = self.get_employee(row[EMPLOYEE_NAME], row[EMPLOYEE_ADDRESS])



