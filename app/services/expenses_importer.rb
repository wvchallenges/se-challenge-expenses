require 'csv'

class ExpensesImporter
  def initialize(file_content: nil)
    @expenses = CSV.parse(file_content, headers: true)
  end

  def import
    uploaded_expenses = []
    ActiveRecord::Base.transaction do
      @expenses.each do |expense_row_info|
        expense_row = ExpenseData.new(expense_row_info)
        uploaded_expenses << create_expense(expense_row)
      end
    end
    uploaded_expenses.map(&:id)
  rescue ActiveRecord::RecordInvalid => e
    []
  end

  private

  def create_expense(expense)
    employee = create_employee(expense)
    tax = create_tax(expense)
    category = create_category(expense)
    Expense.create!(employee: employee, tax: tax, date: expense.date, description: expense.description,
        category: category, pretax_amount: expense.pretax_amount, tax_amount: expense.tax_amount,
        total_amount: expense.total_amount)
  end

  def create_tax(expense)
    Tax.create_with(percentage: expense.tax_percentage).find_or_create_by!(name: expense.tax_name)
  end

  def create_employee(expense)
    Employee.find_or_create_by!(name: expense.employee_name, address: expense.employee_address)
  end

  def create_category(expense)
    Category.find_or_create_by!(name: expense.category)
  end
end
