class Tax < ActiveRecord::Base
  attr_accessible :address, :category_id, :date, :employee_name, :exp_desc, :pre_tamount, :tax_amount, :tax_name
end
