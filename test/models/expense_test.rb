require 'test_helper'

class ExpenseTest < ActiveSupport::TestCase

  def test_fixtures
    Expense.all.each do |expense|
      assert expense.valid?, expense.errors.inspect
    end
  end

  def test_monthly_totals_cents
    Expense.delete_all

    first_date = Time.parse('2014-01-30')
    (0..4).each do |add|
      2.times do
        Expense.create!({
          date: first_date + add.months,
          employee: employees(:default),
          category: categories(:default),
          pre_tax_amount_cents: 10000,
          tax_amount_cents: 1000,
          expense_sheet: expense_sheets(:default)
        })
      end
    end

    Expense.monthly_totals_cents.each do |total|
      assert_equal 22000, total[:total]
    end
  end

end
