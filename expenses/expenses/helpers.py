from __future__ import absolute_import, unicode_literals

import csv
from datetime import datetime

from expenses.models import Expense, CSVFile


class BadCSVFile(Exception):
    def __init__(self):
        msg = 'Invalid CSV file detected.'
        super(BadCSVFile, self).__init__(msg)


def save_csv_file(db_session, file):
    """
    Return and save a :class:`expenses.models.CSVFile`.

    Each row in the supplied `file` is mapped to an individual
    :class:`expenses.models.Expense`.

    :param db_session: Current db session.
    :type db_session: :class:`sqlalchemy.orm.session.Session`
    :param file file: CSV file object to read from.
    :raise BadCSVFile: If the supplied `file` can not be read by the csv module.
    :return: A list containing the month and total expenses for the month.
    :rtype: list[tuple(integer, Decimal)]
    """
    csv_file = CSVFile()
    try:
        # Requires bytestring for delimeter and quotechar.
        csv_reader = csv.reader(file, delimiter=b',', quotechar=b'"')
        csv_file.expenses = [
            _make_expense_from_line(line) for line in list(csv_reader)[1:]
        ]
    except csv.Error:
        raise BadCSVFile

    db_session.add(csv_file)
    db_session.flush()
    return csv_file


def _make_expense_from_line(line):
    """
    Return an :class:`expenses.models.Expense` built from the supplied `line`.

    Note that the elements found in `line` should be strings. This function
    takes care of converting them to the expected db types.

    :param list line: A list of columns containing values to be put into a
        :class:`expenses.models.Expense` instance.
    :raise BadCSVFile: If the elements in the `line` can not be properly
        converted.
    :return: Non-persisted :class:`expenses.models.Expense` instance.
    :rtype: :class:`expenses.models.Expense`
    """
    try:
        return Expense(
            date=datetime.strptime(line[0], '%m/%d/%Y'),
            category=line[1],
            employee_name=line[2],
            employee_address=line[3],
            expense_description=line[4],
            pre_tax_amount=line[5].replace(',', ''),
            tax_name=line[6],
            tax_amount=line[7].replace(',', ''))
    except ValueError:
        raise BadCSVFile
