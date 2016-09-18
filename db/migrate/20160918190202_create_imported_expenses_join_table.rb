class CreateImportedExpensesJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_join_table :imports, :expenses, table_name: "imported_expenses" do |t|
      t.index :import_id
      t.index :expense_id
    end
  end
end
