import unittest

import pandas as pd
import numpy as np

from app import app, _get_connection_and_cursor


class DatabaseTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_upload_integrity(self):
        """Tests that the munging operations do not mangle the upload file."""

        csv_file = open('data_example.csv', 'r')
        original_data = pd.read_csv(
            csv_file,
            parse_dates=['date'],
            thousands=',',
            dtype={'tax amount': np.float64, 'pre-tax amount': np.float64})
        original_data.sort(['date', 'employee name'], inplace=True)

        csv_file.seek(0)
        response = self.app.post('/accept_file', data={'data.csv': csv_file}, follow_redirects=True)

        self.assertEqual(200, response.status_code)

        query = """SELECT expenses.date, categories.name AS "category",
            employees.name AS "employee name", employees.address AS "employee address",
            expenses."expense description",
            expenses."pre-tax amount", taxes.name AS "tax name",
            expenses."tax amount"

        FROM expenses
        LEFT JOIN categories ON expenses.category_id = categories.category_id
        LEFT JOIN taxes ON expenses.tax_id = taxes.tax_id
        LEFT JOIN employees ON expenses.employee_id = employees.employee_id
        """

        database, cursor = _get_connection_and_cursor()
        processed_data = pd.read_sql(query, database, parse_dates=['date'])
        processed_data.sort(['date', 'employee name'], inplace=True)

        all_are_equal = np.all(original_data.values == processed_data.values)
        self.assertTrue(all_are_equal)

        csv_file.close()

if __name__ == '__main__':
    unittest.main()
