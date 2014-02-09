class ExpenseSheet < ActiveRecord::Base

  has_many :expenses, dependent: :destroy

  def self.from_csv_row(row)
    Expense.create!({
        date: Date.strptime(row[:date], '%m/%d/%Y'),
        category: row[:category],
        employee_name: row[:employee_name],
        employee_address: row[:employee_address],
        expense_description: row[:expense_description],
        pre_tax_amount_cents: row[:pretax_amount].to_d * 100,
        tax_name: row[:tax_name],
        tax_amount_cents: row[:tax_amount].to_d * 100
      })
  end

  def self.from_csv_file(file_data)
    SmarterCSV.process(file_data) do |row|
      from_row(row)
    end
  end

end
