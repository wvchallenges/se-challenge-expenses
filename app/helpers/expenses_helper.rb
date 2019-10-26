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

  def pretty(hash)
    hash.inject({}) do |result, expense|
      result[[year(expense), month(expense)]] = sprintf( "%0.02f", expense[1]).to_f
      result
    end
  end
end
