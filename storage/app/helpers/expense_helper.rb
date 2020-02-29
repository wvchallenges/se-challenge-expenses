module ExpenseHelper
  def month_as_id(date)
    date.strftime('%Y_%b')
  end
end
