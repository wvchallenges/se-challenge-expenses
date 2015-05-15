class Tax < ActiveRecord::Base
  has_and_belongs_to_many :expenses
  has_many :tax_amounts

  def calculate_total()
    total = 0.0
    self.expenses.each do |e|
      total += e.tax_amounts[0].amount
    end
    return total
  end  
end
