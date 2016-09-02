from __future__ import absolute_import, unicode_literals

from sqlalchemy import extract, func

from expenses.models.expenses import Expense


def get_monthly_expenses(db_session, csv_file_id):
    """
    Return a list of months and their total expenses that are associated with
    the supplied `csv_file_id`.

    :param db_session: Current db session.
    :type db_session: :class:`sqlalchemy.orm.session.Session`
    :param integer csv_file_id: Primary key of the
        :class:`expenses.models.CSVFile` to retrieve expenses of.
    :return: A list containing the month and total expenses for the month.
    :rtype: list[tuple(integer, Decimal)]
    """
    post_tax_amount = (func.sum(Expense.pre_tax_amount) +
                       func.sum(Expense.tax_amount))
    month = extract('month', Expense.date)
    return (
        db_session.query(
            post_tax_amount.label('amount'),
            month.label('month'),
        )
        .filter_by(csv_file_id=csv_file_id)
        .group_by(month)
    )
