class Expense < ActiveRecord::Base
  def self.upload(file)
    records = []
    csv_file = CSV.read(file.path)
    csv_file[1, csv_file.length - 1].each do |row|
      date_specified, category, employee_name, employee_address, expense_description, pre_tax_amount, tax_name, tax_amount = row
      
      new_record = Expense.create(
        date_specified: Date.strptime(date_specified,"%m/%d/%Y"),
        category: category,
        employee_name: employee_name,
        employee_address: employee_address,
        expense_description: expense_description,
        pre_tax_amount: pre_tax_amount,
        tax_name: tax_name,
        tax_amount: tax_amount)
      records.push new_record
    end
    return records
  end
end
