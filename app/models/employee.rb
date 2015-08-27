class Employee < ActiveRecord::Base
	has_many :expenses, :inverse_of => :employee

	def self.import(row)
		employee = self.find_or_create_by(
			name: row['employee name'],
			address: row['employee address']
			)
		
		expense = employee.expenses.build(
			transaction_date: DateTime.strptime(row['date'], "%m/%d/%Y"),
			category: row['category'],
			description: row['expense description'],
			amount: row['pre-tax amount'].gsub(/,/, '').to_f,
			sales_tax: row['tax name']
			)

		expense.save
	end
end
