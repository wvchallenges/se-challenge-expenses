class AddExpenseSheetIdToExpense < ActiveRecord::Migration
  def change
    add_column :expenses, :expense_sheet_id, :integer
  end
end
