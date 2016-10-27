require 'CSV'

class CSVProcessor
  def self.process(csv_file)
    # read file from disk
    first_line = true
    CSV.foreach(csv_file.location) do |row|
      if first_line
        first_line = false
        next
      end

      date                = row[0]
      category_name       = row[1]
      employee_name       = row[2]
      employee_address    = row[3]
      expense_description = row[4]
      pre_tax_amount      = row[5]
      tax_name            = row[6]
      tax_amount          = row[7]

      employee = Employee.find_or_create_by(name: employee_name, address: employee_address)
      category = Category.find_or_create_by(name: category_name)
      type = TaxType.find_or_create_by(name: tax_name)

      ExpenseEntry.create(
        date: Date.strptime(date, '%m/%d/%Y'),
        description: expense_description,
        pre_tax_amount: (pre_tax_amount.to_f * 100).to_i, # convert to cents, integer math is easier
        tax_amount: (tax_amount.to_f * 100).to_i,         # ditto
        employee: employee,
        category: category,
        tax_type: type
      )
    end

    return true
  end
end
