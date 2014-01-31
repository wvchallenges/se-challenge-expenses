require 'test_helper'

class ExpenseTest < ActiveSupport::TestCase

  def test_fixtures
    Expense.all.each do |expense|
      assert expense.valid?, expense.errors.inspect
    end
  end

  def test_pre_tax_dollars
    expense = Expense.create({ pre_tax_amount_cents: 1000 })
    assert_equal 10.00, expense.pre_tax_amount_dollars
  end

  def test_tax_amount_dollars
    expense = Expense.create({ tax_amount_cents: 1000 })
    assert_equal 10.00, expense.tax_amount_dollars
  end

end
