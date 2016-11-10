class Employee < ActiveRecord::Base
  validates :name, :address,
            presence: true

  validates :name,
            uniqueness: true
end
