class Expense < ApplicationRecord
  belongs_to :expense_category
  belongs_to :employee
  belongs_to :tax

  def self.all_by_month
    all.group_by { |expense| expense.expensed_on.beginning_of_month }.sort_by(&:first).map do |date, expenses|
      ExpenseGroup.new(date.strftime("%B %Y"), expenses)
    end
  end

  def total
    @total ||= pre_tax_amount + tax_amount
  end
end
