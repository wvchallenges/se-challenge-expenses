class Category < ApplicationRecord
  has_many :expense_entries
end
