require 'test_helper'

class ExpenseTest < ActiveSupport::TestCase
  test "must have amount" do
    expense = Expense.new 
    assert_not expense.save, "Cannot save expense without amount"

    expense = Expense.new amount: 10.0
    assert expense.save, "Save amount"
    assert_equal 10.0, expense.amount

    expense = Expense.new amount: -10.0
    assert_not expense.save, "Cannot save expense negative amount"
  end

  test "amount with separator and dollar sign is parsed" do
    expense = Expense.new amount: "$1,299.00"
    assert_equal 1299.00, expense.amount, "Price is parsed correctly"
  end

  test "amounts and taxes are summed" do
    expense = Expense.new amount: "$1,299.00"
    expense.save!

    expense.tax_amounts.create amount_cents: 129900 * 0.08
    expense.tax_amounts.create amount_cents: 129900 * 0.10

    assert_equal 1299.00 * 0.18, expense.calculate_total_tax_amount()
    assert_equal 1299.00 * 1.18, expense.calculate_total_amount()
  end

  test "tax amount is found for tax" do
    expense = Expense.new amount: "$1,299.00"
    expense.save!

    tax_gst = Tax.new name: "GST"
    tax_gst.expenses << expense 

    tax_pst = Tax.new name: "PST"
    tax_pst.expenses << expense

    tax_pst.save!
    tax_gst.save!

    tax_pst.tax_amounts.create amount_cents: (129900 * 0.08), expense_id: expense.id
    tax_gst.tax_amounts.create amount_cents: (129900 * 0.10), expense_id: expense.id
    tax_pst.save!
    tax_gst.save!
    expense.reload

    assert_equal (1299.00 * 0.08), expense.get_amount_for_tax(tax_pst).amount
    assert_equal (1299.00 * 0.10), expense.get_amount_for_tax(tax_gst).amount
  end

end
