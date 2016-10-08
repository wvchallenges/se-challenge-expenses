require 'csv'

class ExpensesController < ApplicationController

  def index
    @expenses = Expense.all.includes(:tax,
                                     :expense_category,
                                     :employee)
  end

  def import
    csv_file = params[:csv_file]

    CSV.parse(csv_file.read, headers: true) do |row|

      employee = Employee.find_or_initialize_by(
        name: row['employee name'],
        address: row['employee address']
      )

      tax = Tax.find_or_initialize_by(name: row['tax name'])

      expense_category = ExpenseCategory.find_or_initialize_by(
        name: row['category']
      )

      Expense.create!(
        employee: employee,
        tax: tax,
        expense_category: expense_category,

        expense_date: Date.strptime(row['date'], '%m/%d/%Y'),
        description: row['expense description'],
        pretax_amount: row['pre-tax amount'],
        tax_amount: row['tax amount']
      )

    end

    redirect_to expenses_path
  end

end
