class CreateExpenseCategories < ActiveRecord::Migration
  def change
    create_table :expense_categories do |t|
      t.string :name

      t.timestamps null: false

      t.index :name
    end
  end
end
