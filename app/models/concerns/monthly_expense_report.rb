module MonthlyExpenseReport
  extend ActiveSupport::Concern
  
  def month_id(expense)
    [expense.date.year, expense.date.month]
  end
  
  def add_expense_to_month(expense)
    @month_id = month_id(expense)
    if (@month_id != @current_month_id)
      add_month_report unless @current_month_id == nil
      @month_total = 0
      @current_month_id = @month_id 
    end

    @month_total += expense.total_with_tax
  end

  def add_month_report
    @report[:months] << { month: display_month, total_expenses: @month_total.round(2) } 
  end

  def display_month
    "#{Date::MONTHNAMES[@current_month_id[1]]}/#{@current_month_id[0]}"
  end

  def monthly_expense_report
    @report = {
      filename: self.name,
      months: [] 
    } 
    expenses.each do |expense| 
      add_expense_to_month(expense)
    end
    add_month_report # adds last month, not elegant, refactor
    @current_month_id = nil

    @report
  end

end
