from __future__ import absolute_import, unicode_literals

from sqlalchemy import (
    Column,
    ForeignKey,
    Numeric,
    Integer,
    Text,
    Date
)
from sqlalchemy.orm import relationship

from expenses.models.csvfiles import CSVFile
from expenses.models.meta import Base


class Expense(Base):
    """
    References a single row from an uploaded csv file.

    All other :class:`expenses.models.Expense` objects that were created from
    the same uploaded file will have the same `csv_file_id` set.
    """
    __tablename__ = 'expenses'

    expense_id = Column(Integer, primary_key=True)
    csv_file_id = Column(Integer, ForeignKey(CSVFile.csv_file_id))

    date = Column(Date)
    category = Column(Text)
    employee_name = Column(Text)
    employee_address = Column(Text)
    expense_description = Column(Text)
    pre_tax_amount = Column(Numeric)
    tax_name = Column(Text)
    tax_amount = Column(Numeric)

    csv_file = relationship(CSVFile, backref='expenses')
