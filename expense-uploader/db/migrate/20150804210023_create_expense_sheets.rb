class CreateExpenseSheets < ActiveRecord::Migration
  def change
    create_table :expense_sheets do |t|
      t.datetime :date_uploaded
      t.timestamps null: false
    end
  end
end
