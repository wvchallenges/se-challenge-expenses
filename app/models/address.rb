class Address < ActiveRecord::Base
  
  attr_accessible :address_line

  has_many :employees

end
