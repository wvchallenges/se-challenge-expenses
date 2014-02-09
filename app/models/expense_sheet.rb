require 'smarter_csv'

class ExpenseSheet < ActiveRecord::Base

  has_many :expenses, dependent: :destroy

  def self.import_csv_row!(row)
    employee = Employee.find_or_create_by!(row[:employee_name], row[:employee_address])

    Expense.create!({
        date: Date.strptime(row[:date], '%m/%d/%Y'),
        category: row[:category],
        employee_id: employee.id,
        expense_description: row[:expense_description],
        pre_tax_amount_cents: row[:pretax_amount].to_d * 100,
        tax_name: row[:tax_name],
        tax_amount_cents: row[:tax_amount].to_d * 100
      })
  end

  def self.import_csv_file!(file_data)
    SmarterCSV.process(file_data) do |row|
      import_csv_row!(row)
    end
  end

end
