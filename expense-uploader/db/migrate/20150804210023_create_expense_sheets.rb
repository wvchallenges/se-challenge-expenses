class CreateExpenseSheets < ActiveRecord::Migration
  def change
    create_table :expense_sheets do |t|

      t.timestamps null: false
    end
  end
end
