from decimal import Decimal
from unittest import TestCase
import datetime

from importer.data_type_converters import StringConverter, DateConverter, DecimalConverter


class TestStringConverter(TestCase):
    def test_successful_conversion(self):
        self.assertEqual("hello world", StringConverter.convert("hello world"))


class TestDateConverter(TestCase):
    def test_successful_conversion(self):
        expected = datetime.date(2014, 8, 14)
        self.assertEqual(expected, DateConverter.convert('8/14/2014'))

        expected = datetime.date(2014, 1, 1)
        self.assertEqual(expected, DateConverter.convert('1/1/2014'))

        expected = datetime.date(2014, 12, 12)
        self.assertEqual(expected, DateConverter.convert('12/12/2014'))


class TestDecimalConverter(TestCase):
    def test_successful_conversion(self):
        decimal = "1.5"
        expected = Decimal(decimal)

        self.assertEqual(expected, DecimalConverter.convert(decimal))


    def test_successful_conversion_with_spaces(self):
        decimal = "  1.8  "
        expected = Decimal(decimal)

        self.assertEqual(expected, DecimalConverter.convert(decimal))

    def test_successful_conversion_with_commas(self):
        decimal = "1,400.8"
        self.assertEqual(Decimal(format(1400.8, '0.2f')), DecimalConverter.convert(decimal))
