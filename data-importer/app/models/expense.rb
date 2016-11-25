class Expense < ApplicationRecord
  belongs_to :tax
  belongs_to :category
  belongs_to :employee
  belongs_to :csv_file
end
