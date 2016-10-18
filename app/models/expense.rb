require 'smarter_csv'
require 'date'

class Expense < ApplicationRecord

  def self.import(csv_file)

    expenses = SmarterCSV.process(csv_file.pathmap, :convert_values_to_numeric=>false)

    expenses.each do |exp|
      #puts(exp[:pre_tax_amount]).to_f
      expense = Expense.new
      expense.date = DateTime.strptime(exp[:date], '%m/%d/%Y')
      expense.category = exp[:category]
      expense.employee_name = exp[:employee_name]
      expense.employee_address = exp[:employee_address]
      expense.expense_description = exp[:expense_description]
      expense.pre_tax_amount = exp[:pre_tax_amount].gsub(',','').to_f
      expense.tax_name = exp[:tax_name]
      expense.tax_amount = exp[:tax_amount].gsub(',','').to_f
      expense.save
    end

  end

end
