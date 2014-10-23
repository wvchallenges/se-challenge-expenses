from importer.data_type_converters import StringConverter, DateConverter, DecimalConverter
from importer.models import ExpenseCategory, Employee, ExpenseAddress, ExpenseItem, TaxCategory, ImportLog


class WaveCsvDataController:
    """
    This implements csv to model population for the Wave CSV Data File.
    It is assumed that all data is valid.
    """

    @property
    def upload_id(self):
        return self._import_log.pk

    def __init__(self, csv_file_name):
        """

        :type csv_file_name: basestring
        :param csv_file_name: the source cvs file of the data that is being imported

        :type _import_log: ImportLog
        """

        self._import_log = ImportLog(file_name=csv_file_name, )
        self._cvs_file_name = csv_file_name

    def start_import(self):
        self._import_log.save()

    def process_record(self, row_data):
        """
        Populates Model from the given row data data.

        :param row_data: a row of data stored as a Dictionary
        :type row_data: dict

        """

        expense_category = ExpenseCategory.objects.get_or_create(
            expense_name=StringConverter.convert(row_data['category']))[0]
        employee = Employee.objects.get_or_create(name=StringConverter.convert(row_data['employee name']))[0]
        address = ExpenseAddress.objects.get_or_create(address=StringConverter.convert(row_data['employee address']))[0]
        tax_category = TaxCategory.objects.get_or_create(tax_name=StringConverter.convert(row_data['tax name']))[0]

        expense_item = ExpenseItem.objects.create(
            transaction_date=DateConverter.convert(row_data['date']),
            expense_category=expense_category,
            employee=employee,
            address=address,
            description=StringConverter.convert(row_data['expense description']),
            pre_tax_amount=DecimalConverter.convert(row_data['pre-tax amount']),
            tax_category=StringConverter.convert(tax_category),
            tax_amount=DecimalConverter.convert(row_data['tax amount']),
        )

        expense_item.save()
        self._import_log.expense_items.add(expense_item)
        self._import_log.save()
