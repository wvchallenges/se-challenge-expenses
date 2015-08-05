class ExpensesSummary

  def initialize(expensesSheet)

    groupedByMonth = expensesSheet.expenses.group_by do |e|
        ary = [e.date.year, e.date.month]
    end

    monthSummaries = Array.new

    groupedByMonth.each do |month,monthExpenses|
      sum = 0.0
      monthExpenses.each {|x| sum += x.pre_tax_amount + x.tax_amount }
      monthSummary = ExpenseMonth.new(month[0], month[1])
      monthSummary.amount = sum
      monthSummaries.push(monthSummary)
    end

    #sort by year then month
    @monthExpenses = monthSummaries.sort_by { |month| ((month.year*100) + month.month) }
  end

  def monthExpenses
    @monthExpenses
  end

  class ExpenseMonth

    attr_accessor :amount
    attr_accessor :year
    attr_accessor :month

    def initialize(year, month)
      @year = year
      @month = month
    end

  end

end
