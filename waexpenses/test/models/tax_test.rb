require 'test_helper'
class TaxTest < ActiveSupport::TestCase
  require 'money'
  require 'monetize'

  test "taxes are totaled" do
    expense = Expense.new description: "Expense 1", amount: "$1,299"

    tax_amount_value = Monetize.parse 0.10 * 1299.00

    #-- get the tax by name, possibly to lower.
    tax = Tax.new name: "CA Sales Tax"

    tax.expenses << expense

    expense.save!
    tax.save!

    tax_amount = tax.tax_amounts.create  amount_cents: tax_amount_value.cents, expense_id: expense.id

    assert_equal 1, expense.taxes.count
    assert_equal 1, tax.expenses.count
    assert_equal 129.90, expense.taxes[0].tax_amounts[0].amount
    assert_equal 129.90, tax.tax_amounts[0].amount
  end
end
