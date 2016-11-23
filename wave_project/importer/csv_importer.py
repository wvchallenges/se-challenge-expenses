import csv


class DataType(object):
    (date, string, currency) = range(3)


class CsvFileReader:
    def parse_file(self, file_name, importer):
        pass


class CsvImporter:
    """
    Import CVS Data and call the Data Handler to process each record further.

    """

    def __init__(self, data_controller):
        self._data_controller = data_controller

    def import_data(self, csv_file):
        """
        Iterates through a list of csv records and delegates processing to the data_controller object

        :param FILE csv_file: the csv being uploaded

        :rtype : object
        """

        csv_reader = csv.DictReader(f=csv_file, dialect=csv.excel)

        self._data_controller.start_import()

        for row in csv_reader:
            self._data_controller.process_record(row)

        upload_id = self._data_controller.upload_id
        return upload_id




