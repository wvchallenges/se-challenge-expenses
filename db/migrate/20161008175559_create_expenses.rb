class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :expense_date
      t.decimal :pretax_amount
      t.decimal :tax_amount
      t.text :description
      t.references :employee, index: true, foreign_key: true
      t.references :tax, index: true, foreign_key: true
      t.references :expense_category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
