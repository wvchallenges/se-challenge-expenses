class Employee < ActiveRecord::Base
  validates_presence_of :name, :address
  validates_uniqueness_of :name
end
