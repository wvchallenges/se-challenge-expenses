from rest_framework.parsers import BaseParser
import csv
import expenses.constants as CONSTANTS

class PlainTextParser(BaseParser):
    """
    Parses the expense CSV file
    """
    media_type = 'text/csv'
    
    HEADERS = (CONSTANTS.DATE,
            CONSTANTS.CATEGORY,
            CONSTANTS.EMP_NAME,
            CONSTANTS.EMP_NAME,
            CONSTANTS.DESC, 
            CONSTANTS.PRE_TAX_AMT,
            CONSTANTS.TAX_NAME,
            CONSTANTS.TAX_AMT)

    def parse(self, stream, media_type=None, parser_context=None):
        """
        Parses a CSV with the following headings

        date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount

        into a list of dict
        """

        raw_csv = str(stream.read())
        lines = raw_csv.split('\\n')
        # seems to be a bug with this library when specifying headers
        # result = csv.DictReader(lines, fieldnames=self.HEADERS)

        result = csv.DictReader(lines)

        return result
