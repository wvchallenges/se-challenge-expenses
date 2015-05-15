class CsvImport
  require 'csv'
  require 'money'
  require 'monetize'

  def self.import(file)
    CSV.foreach(file.path, :headers => true ) do |expense_row|

      #-- date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
      employee = Employee.find_or_create_from_name(expense_row[2].strip)
      employee.address = expense_row[3].strip

      #-- amounts will be handled by Money in expense
      expense_amount = Monetize.parse expense_row[5]
      expense_date = Date.strptime(expense_row[0].strip, "%m/%d/%Y")

      expense = Expense.find_by date: expense_date, description: expense_row[4].strip, amount_cents: expense_amount.cents

      #-- check if the expense belonging to the employee already exists.
      #-- expense was imported if same date/belongs to same employee/same amount.
      if (!expense.nil? && expense.employee == employee)
        next
      end

      category = Category.find_or_create_by_heirarchy(expense_row[1])
      expense = employee.expenses.create date: expense_date, description: expense_row[4].strip, amount_cents: expense_amount.cents, category_id: category.id

      taxes = Array.new;
      tax_index = 6;
      until (tax_index >= expense_row.count )
        tax_amount_value = Monetize.parse expense_row[tax_index+1]

        #-- get the tax by name, possibly to lower.
        tax = Tax.find_or_create_by! :name => expense_row[tax_index].strip

        tax.expenses << expense

        tax_amount = tax.tax_amounts.create date: expense_date, amount_cents: tax_amount_value.cents, expense_id: expense.id

        tax_index += 2
      end

      expense.save!
      employee.save!
    end
  end

  def self.convert_to_currency(amount)
    return amount.to_s.gsub(/[^\d\.]/, '').to_f
  end
end