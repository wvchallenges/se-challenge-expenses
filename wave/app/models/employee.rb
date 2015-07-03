class Employee < ActiveRecord::Base
  has_many :expenses
end
