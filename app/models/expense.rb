class Expense < ActiveRecord::Base
  belongs_to :employee
  belongs_to :category

  def self.import(file)
    unless file.nil?
      ids = []
      SmarterCSV.process(file.tempfile).each do |row|
	ids << import_row(row)
      end
      ids
    end
  end

  def self.import_row(row)
    category = Category.find_or_create_by({name: row[:category]})
    employee = Employee.find_or_create_by({name: row[:employee_name], address: row[:employee_address]})

    attribs = {
      employee_id: employee.id, 
      category_id: category.id, 
      description: row[:expense_description],
      pre_tax: row[:"pre-tax_amount"],
      tax_name: row[:tax_name],
      tax_amount: row[:tax_amount],
      date: Chronic.parse(row[:date], :endian_precedence => [:little, :median])
    }

    expense = Expense.create(attribs)
    expense.id
  end
end
