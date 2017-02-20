class Expense < ApplicationRecord
  class << self
    def monthly_expenses
      # Select the date, pre-tax, and tax amount for all Expenses.
      expenses = Expense.all.pluck(:occurance_date, :pre_tax_amount, :tax_amount)
      calculated_monthly_expenses = {}

      expenses.each do |expense|
        # expense.second is the pre_tax_amount, expense.third is the tax_amount
        expense_value = (expense.second - expense.third)
        time = expense.first.strftime('year: %y month: %m')
        if calculated_monthly_expenses[time].nil?
          calculated_monthly_expenses[time] = expense_value
        else
          calculated_monthly_expenses[time] += expense_value
        end
      end
      return calculated_monthly_expenses
    end
  end
end
