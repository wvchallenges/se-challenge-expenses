'''
Created on Feb 11, 2018

@author: ezliuti
'''
import csv, os

def parse_csv(filename):
    with open(filename) as f:
        reader = csv.reader(f)
        return list(reader)[1:]

def calculate_total_expenses(data):
    expense_dict = {}
    expense_list = []
    for record in data:
        month = change_date_format(r'/'.join([record[0].split(r'/')[0], record[0].split(r'/')[2]]))
        if month not in expense_dict:
            expense_dict[month] = 0
        expense = round(float(record[5].replace(',', '')), 2) + round(float(record[7].replace(',', '')), 2)
        expense_dict[month] = round(expense_dict[month] + expense, 2)
    for item in expense_dict.items():
        expense_list.append({'month': item[0],
                             'expense': item[1]})
    return expense_list

def change_date_format(date):
    month, year = date.split('/')
    return year + '/' + month
