class Expense < ActiveRecord::Base
  belongs_to :employee
  
  require 'csv'

  def self.upload(file)

    if (file == nil)
      return false
    end

    month_expense = []

    users = Employee.destroy_all()
    records = Expense.destroy_all()

    data_array = CSV.read(file.path)
    data_array.drop(1).each do |array_row|
      # find total
      date = Date.strptime(array_row[0], '%m/%d/%Y')
      amount = array_row[5].gsub(/[^\d\.]/, '').to_d
      tax_amount = array_row[7].gsub(/[^\d\.]/, '').to_d
      total = amount + tax_amount
      this_expense = ExpenseTotal.new(date, total)
      month_expense << this_expense
      # check employee
      names = array_row[2].split(' ')
      employee = Employee.find_or_create_by!(first_name: names[0], last_name:names[1], address:array_row[3])
      #create expense
      expense = employee.expenses.create(date: date, category: array_row[1], description: array_row[4], amount: amount, tax_name: array_row[6], tax_amount: tax_amount)
      month_expense
      expense.save
      employee.save
    end

    return month_expense
  end

end
