class AddExpenseSheetColumnToExpense < ActiveRecord::Migration
  def change
    add_reference :expenses, :expense_sheet, index: true, null: false
  end
end
