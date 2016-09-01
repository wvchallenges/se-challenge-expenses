require_relative '..\test_helper'

class ExpenseTest < ActiveSupport::TestCase
  test "get expense month totals" do
	input_expenses = []
	input_expenses[0] = {
		:date => "12/1/2013",
		:category => "Travel",
		:employee_name => "Don Draper",
		:employee_address => "783 Park Ave, New York, NY 10021",
		:expense_description => "Taxi ride",
		:pretax_amount => 350.00,
		:tax_name => "HST",
		:tax_amount => 50.00
	}
	input_expenses[1] = {
		:date => "12/6/2013",
		:category => "Travel",
		:employee_name => "Don Draper",
		:employee_address => "783 Park Ave, New York, NY 10021",
		:expense_description => "Taxi ride",
		:pretax_amount => 200.00,
		:tax_name => "HST",
		:tax_amount => 30.00
	}
	input_expenses[2] = {
		:date => "1/3/2014",
		:category => "Travel",
		:employee_name => "Don Draper",
		:employee_address => "783 Park Ave, New York, NY 10021",
		:expense_description => "Taxi ride",
		:pretax_amount => 310.00,
		:tax_name => "HST",
		:tax_amount => 20.00
	}

	hash_output = Expense.month_totals(input_expenses)

	assert_equal 2, hash_output.count
	assert_equal 630, hash_output["12/2013"]
	assert_equal 330, hash_output["1/2014"]
  end
end
