from __future__ import absolute_import, unicode_literals

from StringIO import StringIO

from mock import Mock
from nose.tools import assert_raises

from expenses.expenses.helpers import (
    BadCSVFile,
    save_csv_file,
    _make_expense_from_line
)


def test_save_csv_file():
    mocked_db_session = Mock()
    file = StringIO(buf=(
        'date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n' +
        '12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06 '
    ))
    csv_file = save_csv_file(mocked_db_session, file)
    assert len(csv_file.expenses) == 1


def test_save_csv_file_invalid():
    mocked_db_session = Mock()
    file = StringIO(buf=('zzzzzz\n123123'))

    assert_raises(BadCSVFile, save_csv_file, mocked_db_session, file)


def test__make_expense_from_line():
    line = [
        '12/1/2013',
        'Travel',
        'Don Draper',
        '783 Park Ave, New York, NY 10021',
        'Taxi ride',
        '350.00',
        'NY',
        'Sales tax',
        '31.06'
    ]

    # Should just return an Expense instance. No need for assertions here.
    _make_expense_from_line(line)


def test__make_expense_from_line_invalid():
    line = [
        '12/1/201z',  # Note the bad date format here.
        'Travel',
        'Don Draper',
        '783 Park Ave, New York, NY 10021',
        'Taxi ride',
        '350.00',
        'NY',
        'Sales tax',
        '31.06'
    ]

    assert_raises(BadCSVFile, _make_expense_from_line, line)
