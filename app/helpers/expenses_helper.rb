module ExpensesHelper
  def year(expense)
    expense[0][0]
  end

  def month(expense)
    Date::MONTHNAMES[expense[0][1]]
  end

  def total(expense)
    number_to_currency(expense[1])
  end
end
