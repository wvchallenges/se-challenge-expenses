class Employee < ActiveRecord::Base
  
  attr_accessible :address, :name

  belongs_to :address
  has_many :expenses

end
