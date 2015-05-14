class Tax < ActiveRecord::Base
  has_and_belongs_to_many :expenses
  has_many :tax_amounts
end
