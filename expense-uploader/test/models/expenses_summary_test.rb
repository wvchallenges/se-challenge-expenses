require 'test_helper'
require 'date'

class ExpensesSummaryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "create summary with all different months gives a summary for each month" do

    expenseSheet = createExpenses([
       [Date.new(2013,1,2), 123.2, 0.5],
       [Date.new(2014,1,2), 123.2, 0.6],
       [Date.new(2015,1,2), 123.2, 0.7],
       [Date.new(2016,1,2), 123.2, 0.8],
      ])

    subject = ExpensesSummary.new(expenseSheet)

    assert subject.monthExpenses.length == 4

  end

  test "create summary with some same months groups expenses for each month" do

    expenseSheet = createExpenses([
       [Date.new(2013,1,2), 123.2, 0.5],
       [Date.new(2013,1,2), 100.2, 0.6],
       [Date.new(2015,1,2), 1.2, 0.7],
       [Date.new(2016,1,2), 11.2, 0.8],
      ])

    subject = ExpensesSummary.new(expenseSheet)

    assert subject.monthExpenses.length == 3
    assert_equal 2013, subject.monthExpenses[0].year
    assert_equal 224.5, subject.monthExpenses[0].amount
  end

  private
    def createExpenses(dateAmountArray)
      expenseSheet = ExpenseSheet.new

      dateAmountArray.each do |ary|
        expense = Expense.new( date: ary[0], pre_tax_amount: ary[1], tax_amount: ary[2] )
        expenseSheet.expenses.push(expense)
      end

      return expenseSheet
    end

end
