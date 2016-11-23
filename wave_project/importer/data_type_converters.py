import datetime
from decimal import Decimal

"""
Module that contains data converters from a string format to specific format
"""


class DateConverter:
    """
    The expected format for this date a static M/D/YYYY ( for simplicity in the exercise ).
    """

    @classmethod
    def convert(cls, value):
        """
        :type value: str
        :rtype : date
        """
        return datetime.datetime.strptime(value, "%m/%d/%Y").date()


class StringConverter:
    """
    A passthrough function essentially - returns what it is given
    """

    @classmethod
    def convert(cls, value):
        """

        :param value: string value
        :type value: str
        """
        return value


class DecimalConverter:
    """
    Converts string to a decimal
    """


    @classmethod
    def convert(cls, value=''):
        """

        Converts String to a Decimal taking into account any commas, which are removed.

        :type value: str
        :rtype : str
        """
        decimal_value = value.replace(',', '')
        return Decimal(decimal_value)
