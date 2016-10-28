class ExpenseEntry < ApplicationRecord
  belongs_to :employee
  belongs_to :category
  belongs_to :tax_type

  belongs_to :csv_file, class_name: CSVFile
end
