require 'csv'

class ExpenseImportService < ApplicationService
  def initialize(upload)
    @upload = upload
  end

  def import_file(path)
    csv_file = CSV.open(path, headers: true)

    Expense.transaction do
      row_index = 0
      csv_file.map do |row|
        row_index += 1
        begin
          import(row, upload)
        rescue StandardError
          raise ImportError.intialize_for_line(row_index, row)
        end
      end
    end
  end

  class ImportError < StandardError
    MESSAGE = "Failed to process line #%s (where line #0 is the header):\n" \
              '%s' \
              'None of the expenses have been uploaded. ' \
              'Please fix that line and try again.'.freeze

    def self.intialize_for_line(line_index, csv_row)
      new format(MESSAGE, line_index, csv_row.to_csv)
    end
  end

  private

  attr_reader :upload

  def import(csv_row, upload)
    upload.expenses.create! parse_attributes(csv_row.to_hash)
  end

  def parse_attributes(original_attributes)
    attributes = {}

    attributes.merge! parse_category(original_attributes)
    attributes.merge! parse_employee(original_attributes)
    attributes.merge! parse_tax(original_attributes)

    attributes[:date] = date original_attributes.delete('date')
    attributes[:description] = original_attributes.delete 'expense description'
    attributes[:pre_tax_amount] = original_attributes.delete 'pre-tax amount'
    attributes[:tax_amount] = original_attributes.delete 'tax amount'

    attributes
  end

  def parse_category(original_attributes)
    category_name = original_attributes.delete('category')
    category = Category.find_or_create_by!(name: category_name)
    { category_id: category.id }
  end

  def parse_employee(original_attributes)
    employee_name = original_attributes.delete 'employee name'
    employee_address = original_attributes.delete 'employee address'
    employee = Employee.find_or_create_by!(name: employee_name) do |new_employee|
      new_employee.address = employee_address
    end
    { employee_id: employee.id }
  end

  def parse_tax(original_attributes)
    tax_name = original_attributes.delete 'tax name'
    tax = Tax.find_or_create_by!(name: tax_name)
    { tax_id: tax.id }
  end

  def date(original_date)
    Date.strptime original_date, '%m/%d/%Y'
  end
end
