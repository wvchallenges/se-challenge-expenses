class ExpenseEntry < ApplicationRecord
  belongs_to :employee
  belongs_to :category
  belongs_to :tax_type

  belongs_to :csv_file, class_name: CSVFile

  def total_expense
    pre_tax_amount + tax_amount
  end
end
