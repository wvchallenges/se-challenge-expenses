
class Expense < ActiveRecord::Base

  monetize :amount_cents, :numericality => { :greater_than => 0 }

  validates :amount, :presence => true
  validates :amount, :numericality => {greater_than: 0}

  belongs_to :employee
  belongs_to :category
  has_and_belongs_to_many :taxes
  has_many :tax_amounts

  def calculate_total_amount()
    return self.amount + calculate_total_tax_amount()
  end  

  def calculate_total_tax_amount()
    tax_amount = 0.0
    self.tax_amounts.each do |t|
      tax_amount += t.amount
    end
    return tax_amount
  end  

  def get_amount_for_tax(tax)
    tax.tax_amounts.each do |t|
      if t.expense_id == self.id
        return t
      end
    end

    tax_amount = tax.tax_amounts.select( expense_id: self.id)
    return !tax_amount.nil? ? tax_amount.first : nil
  end


  def self.total_by_month(expenses)
    dates = Hash.new(0.0)

    expenses.each do |expense|
      month_and_year = Date.new(expense.date.year, expense.date.month, 1)
      dates[month_and_year] += expense.calculate_total_amount()
    end
    return dates
  end
end