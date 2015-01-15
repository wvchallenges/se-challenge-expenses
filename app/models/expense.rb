class Expense < ActiveRecord::Base
	belongs_to :user
	require 'csv'

	def self.import(file,id)
    CSV.foreach(file.path, headers: true) do |row|
      expense_hash = row.to_hash # exclude the price field
      expense_hash["pretax_amount"] = expense_hash.delete "pre-tax amount"
      expense_hash["employee_name"] = expense_hash.delete "employee name"
      expense_hash["employee_address"] = expense_hash.delete "employee address"
      expense_hash["expense_description"] = expense_hash.delete "expense description"
      expense_hash["tax_name"] = expense_hash.delete "tax name"
      expense_hash["tax_amount"] = expense_hash.delete "tax amount"
      expense_hash["user_id"] = id
      expense_hash["pretax_amount"] = expense_hash["pretax_amount"].to_i
      expense_hash["tax_amount"] = expense_hash["tax_amount"].to_i
      expense_hash["date"] = Date.strptime (expense_hash["date"]), '%m/%d/%Y'
      Expense.create!(expense_hash)
    end 
  end 
end 

