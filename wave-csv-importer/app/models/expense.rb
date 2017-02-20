class Expense < ApplicationRecord
  class << self
    def monthly_expenses
      expenses = Expense.all.pluck(:occurance_date, :pre_tax_amount, :tax_amount)
      calculated_monthly_expenses = {}

      expenses.each do |expense|
        month = expense.first.month
        pre_tax_amount = expense.second
        tax_amount = expense.third

        subtotal_expense_value = (pre_tax_amount - tax_amount)
        if calculated_monthly_expenses[month].nil?
          calculated_monthly_expenses[month] = subtotal_expense_value
        else
          calculated_monthly_expenses[month] += subtotal_expense_value
        end
      end

      return calculated_monthly_expenses
    end
  end
end
