import re
import dateutil.parser


class SanitizeInput():
    """ Sanitizes input for currency and dating formats. """

    def __init__(self):
        self.currency_helper = CurrencyHelper()

    def sanitize_date_format(self, date):
        return dateutil.parser.parse(date).strftime('%Y-%m-%d')

    def sanitize_float_format(self, str_float_val):
        non_decimal = re.compile(r'[^\d.]+')
        str_float_val = non_decimal.sub('', str_float_val)
        str_float_val = self.currency_helper.dollars_to_cents(str_float_val)

        return str_float_val


class CurrencyHelper():
    """ Conversion functions between USD/CAD dollars and cents. """

    def dollars_to_cents(self, dollars, truncate=True):
        cents = float(dollars) * 100
        if truncate:
            return int(cents)
        else:
            return cents

    def cents_to_dollars(self, cents):
        return format(float(cents) / 100.0, '.2f')


class DateHelper():

    def month_name(self, month_num):
        names = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
                 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}
        return names[month_num]
