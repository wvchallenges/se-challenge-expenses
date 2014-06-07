class ExpenseSheet < ActiveRecord::Base
  has_many :expenses
  mount_uploader :expense_file, ExpenseSheetUploader

  PURCHASE_DATE = 0
  CATEGORY = 1
  NAME = 2
  ADDRESS = 3
  DESCRIPTION = 4
  PRE_TAX = 5
  TAX_NAME = 6
  TAX_AMOUNT = 7

  def parse_expense_file
    CSV.foreach(expense_file.current_path, headers: true) do |row|
      create_models(row)
    end
  end

  def create_models(line)
    new_expense = expense(line)
    new_expense.employee = employee(line)
    new_expense.category = category(line)
    new_expense.expense_sheet = self
    new_expense.save!
  end

  def employee(line)
    Employee.find_or_create_by!(name: line[NAME]) do |employee|
      employee.set_address(line[ADDRESS])
    end
  end

  def category(line)
    Category.find_or_create_by!(name: line[CATEGORY])
  end

  def expense(line)
    expense = Expense.new
    expense.purchase_date = Date.strptime(line[PURCHASE_DATE], "%m/%d/%Y")
    expense.description = line[DESCRIPTION]
    expense.pre_tax_amount = line[PRE_TAX].gsub(',', '').to_f * 100
    expense.tax_name = line[TAX_NAME]
    expense.tax_amount = line[TAX_AMOUNT].gsub(',', '').to_f * 100
    expense
  end
end
