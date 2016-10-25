class Tax < ActiveRecord::Base
  has_many :expenses
end
