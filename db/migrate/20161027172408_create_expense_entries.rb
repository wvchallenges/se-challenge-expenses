class CreateExpenseEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :expense_entries do |t|
      t.date :date
      t.string :description
      t.integer :pre_tax_amount
      t.integer :tax_amount

      t.references :category
      t.references :tax_type
      t.references :employee

      t.timestamps
    end
  end
end
