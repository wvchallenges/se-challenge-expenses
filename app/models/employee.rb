class Employee < ApplicationRecord
  has_many :employee_expenses
  validates_presence_of :name, :address
  validates :name, uniqueness: {scope: :address}
end
