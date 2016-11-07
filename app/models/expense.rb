class Expense < ActiveRecord::Base
  require 'csv'

  # using enum and index to compress the storage and improve the efficiency
  enum category: [ :Travel, :'Meals and Entertainment', :'Computer - Hardware', :'Computer - Software', :'Office Supplies']
  enum tax_name: [ :'NY Sales tax', :'CA Sales tax' ]

  def self.import(expense_file)
    rows_imported = 0
    rows_total = 0
    success_msg = true
    CSV.foreach(expense_file.path, headers: true) do |row|
      begin
        new_expense = self.new( 
          :date => Date.strptime(row[0], "%m/%d/%Y").to_s(:db),
          :category => row[1],
          :employee_name => row[2],
          :employee_address => row[3],
          :expense_description => row[4],
          :pre_tax_amount => row[5].gsub(",", ""),
          :tax_name => row[6],
          :tax_amount => row[7].gsub(",", ""),
        )
        new_expense.save!
        rows_imported = rows_imported + 1
      rescue Exception => e
        success_msg = false
      end
      rows_total = rows_total + 1
    end

    return rows_imported, rows_total, success_msg
  end
end
