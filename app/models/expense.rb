class Expense < ActiveRecord::Base

  attr_accessible :date, :category, :expense_description, :pre_tax_amount, :tax_name, :tax_amount, :csvfile, :employee 
  
  belongs_to :employee
  belongs_to :csvfile

end
