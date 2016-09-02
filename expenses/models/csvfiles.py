from __future__ import absolute_import, unicode_literals

from sqlalchemy import Column, Integer

from expenses.models.meta import Base


class CSVFile(Base):
    """
    References an uploaded CSVFile.
    """
    __tablename__ = 'csv_files'

    csv_file_id = Column(Integer, primary_key=True)