class ExpenseSheet < ActiveRecord::Base
  mount_uploader :expense_file, ExpenseSheetUploader

  PURCHASE_DATE = 0
  CATEGORY = 1
  NAME = 2
  ADDRESS = 3
  DESCRIPTION = 4
  PRE_TAX = 5
  TAX_NAME = 6
  TAX_AMOUNT = 7

  def employee(line)
    employee = Employee.new
    employee.name = line[NAME]
    employee.set_address(line[ADDRESS])
    employee
  end

  def category(line)
    Category.new name: line[CATEGORY]
  end

  def expense(line)
    expense = Expense.new
    expense.purchase_date = line[PURCHASE_DATE]
    expense.description = line[DESCRIPTION]
    expense.pre_tax_amount = line[PRE_TAX]
    expense
  end
end
