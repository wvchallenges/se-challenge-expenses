class ExpenseGroup
  attr_reader :grouping, :expenses

  def initialize(grouping, expenses)
    @grouping = grouping
    @expenses = expenses
  end

  def total
    expenses.sum(&:total)
  end
end
