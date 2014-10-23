from collections import namedtuple


ExpenseSummary = namedtuple('MonthlyTotal', ['date', 'pre_tax_amount', 'tax_amount', 'total_amount'])


class MonthlySummaryCalculator:
    """

    Calculate summaries on a monthly basis for all ExpenseItems referenced by a ImportLog record.

    """

    def calculate_summary(self, import_log_query_set):
        """
        Calculates the monthly Total Pre-tax amounts and Total Sales Total amounts, plus pre-tax + tax amounts on a monthly
        basis.

        :param QuerySet   import_log_query_set:   an ImportLog query_set to be used for calculating monthly summaries.
        :return: list[ExpenseSummary]
        """

        expense_items = import_log_query_set.expense_items

        all_months = expense_items.dates('transaction_date', 'month')

        summaries = []

        for month in all_months:
            record = expense_items.month_sum(month=month)

            pre_tax_amount = record['pre_tax_amount__sum']
            tax_amount = record['tax_amount__sum']
            total_amount = pre_tax_amount + tax_amount

            totals = ExpenseSummary(date=month, pre_tax_amount=pre_tax_amount, tax_amount=tax_amount,
                                    total_amount=total_amount)

            summaries.append(totals)

        return summaries
