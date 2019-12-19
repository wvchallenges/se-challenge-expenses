echo DELETE FROM ExpenseCalculator_rawexpensesheet; | manage.py dbshell
echo DELETE FROM ExpenseCalculator_monthlyexpense; | manage.py dbshell
python ./mysite/load_file.py
python ./mysite/calculate.py