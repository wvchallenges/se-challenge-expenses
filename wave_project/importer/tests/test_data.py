import datetime

from importer.models import ExpenseAddress, Employee, ExpenseCategory, TaxCategory, ExpenseItem, ImportLog


def load_test_data():
    address1 = ExpenseAddress.objects.create(address='1 Polar Loop, Toronto, ON, M6J 1W7')
    address2 = ExpenseAddress.objects.create(address='1 Queen St West, Toronto, ON, M6J 1W7')

    river_song = Employee.objects.create(name='Professor River Song')
    doctor_who = Employee.objects.create(name='Dr Who')

    expense_category1 = ExpenseCategory.objects.create(expense_name='Hardware Sales')
    expense_category2 = ExpenseCategory.objects.create(expense_name='Software Sales')

    sales_tax = TaxCategory.objects.create(tax_name='Sales Tax')

    expense_item_1 = ExpenseItem.objects.create(transaction_date=datetime.date(2014, 01, 13),
                                                expense_category=expense_category2,
                                                employee=river_song, address=address1,
                                                description='Archaeology Software',
                                                pre_tax_amount=100.00, tax_category=sales_tax,
                                                tax_amount=13.00)

    expense_item_2 = ExpenseItem.objects.create(transaction_date=datetime.date(2014, 03, 12),
                                                expense_category=expense_category1,
                                                employee=doctor_who, address=address2, description='Sonic Screwdriver',
                                                pre_tax_amount=200.00, tax_category=sales_tax,
                                                tax_amount=26.00)

    expense_item_3 = ExpenseItem.objects.create(transaction_date=datetime.date(2014, 03, 15),
                                                expense_category=expense_category2,
                                                employee=doctor_who, address=address2,
                                                description='Sonic Screwdriver Software',
                                                pre_tax_amount=50.00, tax_category=sales_tax,
                                                tax_amount=6.5)

    expense_item_4 = ExpenseItem.objects.create(transaction_date=datetime.date(2015, 03, 15),
                                                expense_category=expense_category2,
                                                employee=doctor_who, address=address2,
                                                description='Sonic Screwdriver Software v2.0',
                                                pre_tax_amount=50.00, tax_category=sales_tax,
                                                tax_amount=6.5)

    expense_item_5 = ExpenseItem.objects.create(transaction_date=datetime.date(2014, 07, 01),
                                                expense_category=expense_category1,
                                                employee=river_song, address=address1, description='TARDIS Data Core',
                                                pre_tax_amount=400.00, tax_category=sales_tax,
                                                tax_amount=52.0)

    import_log_1 = ImportLog.objects.create(file_name='data-file-1.csv')

    import_log_1.expense_items.add(expense_item_1, expense_item_2, expense_item_3, expense_item_4)
    import_log_1.save()

    import_log_2 = ImportLog.objects.create(file_name='data-file-2.csv')
    import_log_2.expense_items.add(expense_item_5)
    import_log_2.save()

