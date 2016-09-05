class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.integer :category_id
      t.integer :employee_id
      t.string :expense_description
      t.integer :pre_tax_amount_cents
      t.integer :tax_id
      t.integer :tax_amount_cents

      t.timestamps null: false
    end
  end
end
