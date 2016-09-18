class Employee < ApplicationRecord
  validates :name, presence: true
end
