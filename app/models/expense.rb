class Expense < ActiveRecord::Base
	belongs_to :customer
	belongs_to :category


	def self.import(file)
		spreadsheet = SmarterCSV.process(file.tempfile)

		spreadsheet.each do |row|
			category = Category.find_or_create_by({name: row[:category]})

			employee = Employee.find_or_create_by({name: row[:employee_name], full_address: row[:employee_address]})

			attribs = {
				employee_id: employee.id, 
				category_id: category.id, 
				description: row[:expense_description],
				pre_tax: row[:"pre-tax_amount"],
				tax_name: row[:tax_name],
				tax_amount: row[:tax_amount],
				date: Chronic.parse(row[:date], :endian_precedence => [:little, :median])
			}

			Expense.create(attribs)
		end
	end
end
