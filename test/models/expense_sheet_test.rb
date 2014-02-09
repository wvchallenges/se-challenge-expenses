require 'test_helper'

class ExpenseSheetTest < ActiveSupport::TestCase
  def test_import_csv_row
    row_string = '12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06'
    assert_difference %w[ Expense.count Employee.count ] do
      ExpenseSheet.import_csv_row!(row_string)
    end
  end

  def test_import_csv_file
    csv_rows = <<-EOS
date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06
12/15/2013,Meals and Entertainment,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Team lunch, 235.00 ,CA Sales tax, 17.63
12/31/2013,Computer - Hardware,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",HP Laptop, 999.00 ,CA Sales tax, 74.93
EOS

    file = Tempfile.new('expenses.csv')
    file.write(csv_rows)
    file.rewind

    assert_difference %w[ ExpenseSheet.count Employee.count ] do
      ExpenseSheet.import_csv_file!(file)
    end
  end
end
