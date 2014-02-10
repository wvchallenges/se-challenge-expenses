require 'test_helper'

class EmployeeTest < ActiveSupport::TestCase

  def test_total_expenses
    Expense.delete_all

    first_date = Time.parse('2014-01-30')
    (0..4).each do |add|
      2.times do
        Expense.create!({
          date: first_date + add.months,
          employee: employees(:default),
          pre_tax_amount_cents: 10000,
          tax_amount_cents: 1000,
          expense_sheet: expense_sheets(:default)
        })
      end
    end

    assert_equal 100000, employees(:default).total_expenses
  end

end
