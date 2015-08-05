require 'test_helper'
require 'date'

class ExpensesSummaryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "create summary with all different months gives a summary for each month" do

    expenseSheet = createExpenses([
       [Date.new(2013,1,2), 123.2],
       [Date.new(2014,1,2), 123.2],
       [Date.new(2015,1,2), 123.2],
       [Date.new(2016,1,2), 123.2],
      ])

    subject = ExpensesSummary.new(expenseSheet)

    assert subject.monthExpenses.length == 4

  end

  private
    def createExpenses(dateAmountArray)
      expenseSheet = ExpenseSheet.new

      dateAmountArray.each do |ary|
        expense = Expense.new( date: ary[0], pre_tax_amount: ary[1] )
        expenseSheet.expenses.push(expense)
      end

      return expenseSheet
    end

end
