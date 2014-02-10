require 'smarter_csv'

class ExpenseSheet < ActiveRecord::Base

  has_many :expenses, :dependent => :destroy

  def self.import_csv_row(row, sheet_id)
    employee = Employee.find_or_create_by!({
      :name => row[:employee_name],
      :address => row[:employee_address]
    })
    category = Category.find_or_create_by!({ :name => row[:category] })

    Expense.create!({
        :date => Date.strptime(row[:date], '%m/%d/%Y'),
        :category => category,
        :employee => employee,
        :expense_description => row[:expense_description],
        :pre_tax_amount_cents => row[:"pre-tax_amount"].to_d * 100,
        :tax_name => row[:tax_name],
        :tax_amount_cents => row[:tax_amount].to_d * 100,
        :expense_sheet_id => sheet_id
      })
  end

  def self.import_csv_file(file)
    new_sheet = ExpenseSheet.create!
    SmarterCSV.process(file.path, :chunk_size => 5) do |chunk|
      chunk.each do |row|
        import_csv_row(row, new_sheet.id)
      end
    end
    new_sheet
  end

end
