from django.test import TransactionTestCase

from importer.data_controllers import WaveCsvDataController
from importer.data_type_converters import DateConverter, DecimalConverter
from importer.models import ImportLog, TaxCategory, ExpenseCategory, ExpenseItem, Employee, ExpenseAddress


class TestWaveCsvDataController(TransactionTestCase):
    def test_table_population_successful(self):
        expected_date = '08/12/2014'
        expected_expense_category_name = 'Software Application'
        expected_employee_name = 'Steve Gates'
        expected_address = '5 Hill Cres, Toronto, ON, M6J W37'
        expected_description = 'PyCharm'
        expected_pre_tax_amount = '9.00'
        expected_tax_name = 'Sales Tax'
        expected_tax_amount = '59.99'

        row_data = {'date': expected_date, 'category': expected_expense_category_name,
                    'employee name': expected_employee_name,
                    'employee address': expected_address, 'expense description': expected_description,
                    'pre-tax amount': expected_pre_tax_amount, 'tax name': expected_tax_name,
                    'tax amount': expected_tax_amount}

        expected_file_name = 'test_csv.csv'
        controller = WaveCsvDataController(csv_file_name=expected_file_name)
        self.run_wave_data_controller(controller, row_data=row_data)

        actual_import_logs = ImportLog.objects.all()
        self.assertEqual(1, len(actual_import_logs))
        self.check_import_log_record(actual_import_log=actual_import_logs[0], expected_csv_file_name=expected_file_name,
                                     expected_expense_records=1)

        tax_categories = TaxCategory.objects.all()
        self.assertEqual(1, len(tax_categories))

        expense_categories = ExpenseCategory.objects.all()
        self.assertEqual(1, len(expense_categories))

        actual_employees = Employee.objects.all()
        self.assertEqual(1, len(actual_employees))

        actual_address = ExpenseAddress.objects.all()
        self.assertEqual(1, len(actual_address))

        expense_items = ExpenseItem.objects.all()
        self.assertEqual(1, len(expense_items))

        self.check_expense_item(expense_items[0], expected_date, expected_employee_name, expected_description,
                                expected_pre_tax_amount, expected_expense_category_name, expected_tax_amount,
                                expected_address)

    def test_no_duplicate_lookups(self):
        """
        This tess that look ups, such as categories, addresses are not duplicated when inserting duplicate data.
        Import two rows of data.

        """

        expected_date = '08/12/2014'
        expected_expense_category_name = 'Software Application'
        expected_employee_name = 'Steve Gates'
        expected_address = '5 Hill Cres, Toronto, ON, M6J W37'
        expected_description = 'PyCharm'
        expected_pre_tax_amount = '9.00'
        expected_tax_name = 'Sales Tax'
        expected_tax_amount = '59.99'

        row_data = {'date': expected_date, 'category': expected_expense_category_name,
                    'employee name': expected_employee_name,
                    'employee address': expected_address, 'expense description': expected_description,
                    'pre-tax amount': expected_pre_tax_amount, 'tax name': expected_tax_name,
                    'tax amount': expected_tax_amount}

        expected_file_name = 'test_csv.csv'
        controller = WaveCsvDataController(csv_file_name=expected_file_name)
        self.run_wave_data_controller(controller, row_data=row_data)

        expected_employee_name2 = 'Bob'

        row_data = {'date': expected_date, 'category': expected_expense_category_name,
                    'employee name': expected_employee_name2,
                    'employee address': expected_address, 'expense description': expected_description,
                    'pre-tax amount': expected_pre_tax_amount, 'tax name': expected_tax_name,
                    'tax amount': expected_tax_amount}

        expected_file_name = 'test_csv2.csv'
        controller = WaveCsvDataController(csv_file_name=expected_file_name)
        self.run_wave_data_controller(controller, row_data=row_data)

        expense_items = ExpenseItem.objects.all()
        self.assertEqual(2, len(expense_items))

        self.check_expense_item(expense_items[1], expected_date, expected_employee_name2, expected_description,
                                expected_pre_tax_amount, expected_expense_category_name, expected_tax_amount,
                                expected_address)

        tax_categories = TaxCategory.objects.all()
        self.assertEqual(1, len(tax_categories))

        expense_categories = ExpenseCategory.objects.all()
        self.assertEqual(1, len(expense_categories))

        actual_address = ExpenseAddress.objects.all()
        self.assertEqual(1, len(actual_address))

    def run_wave_data_controller(self, data_controller, row_data):
        data_controller.start_import()
        data_controller.process_record(row_data=row_data)

    def check_import_log_record(self, actual_import_log, expected_csv_file_name, expected_expense_records):
        """
        Convienence method for testing individual ImportLog records.

        :type actual_import_log: ImportLog
        :type expected_csv_file_name: str
        :type expected_expense_records: int

        """
        self.assertEqual(expected_csv_file_name, actual_import_log.file_name)
        actual_expenses = actual_import_log.expense_items.all()
        self.assertEqual(expected_expense_records, len(actual_expenses))

    def check_expense_item(self, actual_expense_item, expected_date, expected_employee_name, expected_description,
                           expected_pre_tax_amount, expected_expense_category_name, expected_tax_amount,
                           expected_expense_address):
        """
        Checks given ExpenseItem object matches expected values.

        :type actual_expense_item: ExpenseItem
        """

        self.assertEqual(DateConverter.convert(expected_date), actual_expense_item.transaction_date)
        self.assertEqual(expected_employee_name, actual_expense_item.employee.name)
        self.assertEqual(expected_description, actual_expense_item.description)
        self.assertEqual(DecimalConverter.convert(expected_pre_tax_amount), actual_expense_item.pre_tax_amount)
        self.assertEqual(expected_expense_category_name, actual_expense_item.expense_category.expense_name)
        self.assertEqual(DecimalConverter.convert(expected_tax_amount), actual_expense_item.tax_amount)
        self.assertEqual(actual_expense_item.address.address, expected_expense_address)






