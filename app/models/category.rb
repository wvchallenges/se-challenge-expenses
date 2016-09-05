class Category < ActiveRecord::Base
  has_many :expenses
end
