require 'rails_helper'

describe Expense do
  before do
    setup_expense_records
  end

  describe '#total_expenses_by_month' do
    it 'returns total expenses grouped by month/year' do
      expenses_by_month = {
        'August 2016' => 550,
        'May 2016' => 44,
        'May 2015' => 330
      }
      expect(Expense.total_expenses_by_month).to eq(expenses_by_month)
    end
  end

  private

  def setup_expense_records
    category = Category.create(name: 'Meals')
    employee = Employee.create(name: 'John Doe')
    tax = Tax.create(name: 'Sales Tax', percentage: 0.1)
    default_params = { category: category, employee: employee, tax: tax }
    Expense.create(default_params.merge(pretax_amount: 100, tax_amount: 10, total_amount: 110, date: DateTime.new(2015, 5, 10)))
    Expense.create(default_params.merge(pretax_amount: 200, tax_amount: 20, total_amount: 220, date: DateTime.new(2015, 5, 15)))
    Expense.create(default_params.merge(pretax_amount: 40, tax_amount: 4, total_amount: 44, date: DateTime.new(2016, 5, 6)))
    Expense.create(default_params.merge(pretax_amount: 500, tax_amount: 50, total_amount: 550, date: DateTime.new(2016, 8, 18)))
  end
end
