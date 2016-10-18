from datetime import date


def get_monthly_expenses(expenses):
    mon_exp_map = {}
    for expense in expenses:
        exp_date = expense.date
        exp_month = date(exp_date.year, exp_date.month, 1)
        if exp_month in mon_exp_map:
            mon_exp_map[exp_month] = round(expense.pre_tax + expense.tax + mon_exp_map[exp_month], 2)
        else:
            mon_exp_map[exp_month] = round(expense.pre_tax + expense.tax, 2)
    return mon_exp_map

def save_expenses(expenses):
    for expense in expenses:
        expense.save()