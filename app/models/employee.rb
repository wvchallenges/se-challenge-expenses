class Employee < ApplicationRecord
  has_many :expense_entries
end
