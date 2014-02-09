require 'test_helper'

class ExpenseSheetTest < ActiveSupport::TestCase
  def test_from_file
    csv_rows = <<-EOS
date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06
12/15/2013,Meals and Entertainment,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Team lunch, 235.00 ,CA Sales tax, 17.63
12/31/2013,Computer - Hardware,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",HP Laptop, 999.00 ,CA Sales tax, 74.93
EOS

    file = Tempfile.new('expenses.csv')
    file.write(csv_rows)
    file.rewind

    expense = Expense.last
    assert_equal Date.new(2013,12,31), expense.date
    assert_equal 'Jonathan Ive', expense.employee_name
    assert_equal 99900, expense.pre_tax_amount_cents
    assert_equal 7493, expense.tax_amount_cents
  end
end
