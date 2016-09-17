class MonthlyExpenseReport
  def initialize
    @report = {}
  end

  def add(expense)
    key = expense.item_date.strftime('%Y-%m')
    val = expense.item_amount
    @report[key] ||= 0
    @report[key] += val
  end
  
  def monthly
    @report
  end
end
