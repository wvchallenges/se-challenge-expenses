require 'test_helper'

class ExpenseSheetTest < ActiveSupport::TestCase
  def test_import_csv_row
    row = {
      :date => '12/1/2013',
      :category => 'Travel',
      :employee_name => 'Don Draper',
      :employee_address => "783 Park Ave, New York, NY 10021",
      :expense_description => 'Taxi ride',
      :"pre-tax_amount" => 350.00,
      :tax_name => 'NY Sales tax',
      :tax_amount => 31.06
    }

    sheet = expense_sheets(:default)
    assert_difference %w[ Expense.count Employee.count ] do
      ExpenseSheet.import_csv_row!(row, sheet.id)
    end

    row.each do |attribute|
      assert_equal row[attribute], sheet[attribute]
    end
  end

  def test_import_csv_file
    Employee.delete_all

    csv_rows = <<-EOS
date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06
12/15/2013,Meals and Entertainment,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Team lunch, 235.00 ,CA Sales tax, 17.63
12/31/2013,Computer - Hardware,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",HP Laptop, 999.00 ,CA Sales tax, 74.93
EOS

    file = Tempfile.new('expenses.csv')
    file.write(csv_rows)
    file.rewind

    assert_difference 'ExpenseSheet.count' do
      assert_difference 'Employee.count', 3 do
        ExpenseSheet.import_csv_file!(file)
      end
    end
  end
end
