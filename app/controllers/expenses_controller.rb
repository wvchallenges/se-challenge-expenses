class ExpensesController < ApplicationController
  
  def index
    @expenses = Expense.all
   
    @dates = []
    @total_expense = []
    @expenses.each do |expense|
      
      split_date = expense.date.split("/")
      month_year = split_date[0] + "/" + split_date[2]
      
      # We either add an entry for the month or we update
      # the monthly total entry if one exists already
      included = @dates.include? month_year
      if !included
        @dates << month_year
        @total_expense << expense.pre_tax_amount + expense.tax_amount
      else
        matched_index = @dates.index(month_year)
        if matched_index != nil
          @total_expense[matched_index] += expense.pre_tax_amount + 
						expense.tax_amount
        end
      end
    end

  end # end index

  def import
    begin
      Expense.import(params[:file])
      redirect_to root_url, notice: "File imported."
    rescue
      redirect_to root_url, notice: "Error importing CSV file."
    end
  end # end import

end
