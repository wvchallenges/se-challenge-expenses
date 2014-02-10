class CreateExpenseSheets < ActiveRecord::Migration
  def change
    create_table :expense_sheets do |t|

      t.timestamps
    end
  end
end
