class Expense < ActiveRecord::Base
  require 'csv'

  def self.upload_csv_file(file)
    # This only works since we can assume the rows are always in order and present.
    CSV.foreach(file, headers: true) do |row|
      new_expense = self.new( 
        :date => Date.strptime(row[0], "%m/%d/%Y").to_s(:db),
        :category => row[1], 
        :employee_name => row[2],
        :employee_address => row[3],
        :expense_description => row[4],
        :pretax_amount => row[5],
        :tax_name => row[6],
        :tax_amount => row[7],
        :total_amount => row[5].to_f + row[7].to_f #added this row to quicken total_amount query
      )
      new_expense.save!
    end
  end

end