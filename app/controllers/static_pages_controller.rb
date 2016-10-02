class StaticPagesController < ApplicationController
  def home
    @price1 = BigDecimal.new("2,999,999.00".tr(",",""))
    @price2 = BigDecimal.new("1.01")
    
    @expenses = Expense.all
    @expense_months = Hash.new
    
    @expenses.each do |e|
      @key = e.date.strftime("%Y/%m")
      if not @expense_months.key?(@key)
        @expense_months[@key] = 0
      end
      @expense_months[@key] += (e.pre_tax_amount + e.tax_amount)
    end
  end
  
  def about
  end
  
  def contact
  end
end
