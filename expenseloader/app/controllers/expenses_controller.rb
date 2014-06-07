class ExpensesController < ApplicationController
  def index
    @monthly_expenses = Expense.connection.select_all(%q{
      select  sum(pre_tax_amount) as pre_tax_total,
              sum(tax_amount) as tax_total,
              strftime('%Y', purchase_date) as year,
              strftime('%m', purchase_date) as month
      from expenses
      group by year, month
      order by year, month
    })
  end
end
