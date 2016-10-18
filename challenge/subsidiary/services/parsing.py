from ..models import Expense
from datetime import date


def exp_file_parser(expfile):
    expenses = []
    header = True

    for line in expfile:
        # skip the header
        if header:
            header = False
            continue

        decode_line = line.decode("utf-8").strip()
        decode_line = decode_line.split('"')
        row = []
        for i in range(len(decode_line)):
            decode_line[i] = decode_line[i].strip(" ,")
            if i % 2 == 0:
                row = row + decode_line[i].split(",")
            else:
                row.append(decode_line[i])
        exp = Expense(date=convert_to_model_date_format(row[0]),category=row[1],emp_name=row[2],emp_address=row[3],
                      exp_description=row[4],pre_tax=convert_string_to_float(row[5]),tax_name=row[6],
                      tax=convert_string_to_float(row[7]))

        expenses.append(exp)

    return expenses

def convert_to_model_date_format(input_date):
    date_list = [int(elt) for elt in input_date.split('/')]
    return date(date_list[2], date_list[0], date_list[1])

def convert_string_to_float(str):
    return float(str.replace(",",""))