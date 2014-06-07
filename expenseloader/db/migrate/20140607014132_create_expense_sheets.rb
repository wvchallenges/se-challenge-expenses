class CreateExpenseSheets < ActiveRecord::Migration
  def change
    create_table :expense_sheets do |t|
      t.string :expense_file

      t.timestamps
    end
  end
end
