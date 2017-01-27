class AddExpensesFileToExpenses < ActiveRecord::Migration[5.0]
  def change
    add_reference :expenses, :expenses_file, foreign_key: true
  end
end
