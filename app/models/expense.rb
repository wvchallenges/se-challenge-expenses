class Expense < ActiveRecord::Base

  attr_accessible :date, :category, :expense_description, :pre_tax_amount, :tax_name, :tax_amount, :csvfile, :employee 
  
  belongs_to :employee
  belongs_to :csvfile

  default_scope { order('date ASC') }

  def total_with_tax
    self.pre_tax_amount + self.tax_amount
  end

end
