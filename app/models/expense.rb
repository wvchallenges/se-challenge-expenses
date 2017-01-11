class Expense < ApplicationRecord
  belongs_to :employee
  belongs_to :category
  belongs_to :tax

  validates_presence_of :pretax_amount, :tax_amount, :total_amount, :date

  def self.total_expenses_by_month
    expenses = self.order('date desc').group_by { |a| a.date.beginning_of_month.strftime("%B %Y") }
    expenses.map { |month, month_expenses| [ month, month_expenses.collect(&:total_amount).sum ] }.to_h
  end
end
