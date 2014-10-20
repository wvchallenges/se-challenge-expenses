module CsvDecoder
  extend ActiveSupport::Concern  

  DATE = 0
  CATEGORY = 1
  EMPLOYEE_NAME = 2
  EMPLOYEE_ADDRESS = 3
  EXPENSE_DESCRIPTION = 4
  PRE_TAX_AMOUNT = 5
  TAX_NAME = 6
  TAX_AMOUNT = 7  

  def decode_expense(row)
    address = Address.find_or_create_by(address_line: row[EMPLOYEE_ADDRESS])
    employee = Employee.find_or_create_by(name: row[EMPLOYEE_NAME], address: address)
    expense = Expense.create({
      date: Date.strptime(row[DATE], '%m/%d/%Y'), 
      category: row[CATEGORY], 
      expense_description: row[EXPENSE_DESCRIPTION],
      pre_tax_amount: safe_float(row[PRE_TAX_AMOUNT]),
      tax_name: row[TAX_NAME],
      tax_amount: safe_float(row[TAX_AMOUNT]),
      csvfile: self, 
      employee: employee
    })
  end

  def safe_float(str)
    str.gsub(/[^0-9.]/, "")
  end

  module ClassMethods

    def create_from_csv(csv, name)
      csvfile = Csvfile.create({name: name})
      csv.shift # drop headers, avoid working with strings to keep execution quick
      csv.each { |row| 
        csvfile.decode_expense row
      }
      csvfile
    end

  end

end
