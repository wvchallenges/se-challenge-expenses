class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.datetime :date
      t.string :category
      t.string :employee_name
      t.text :employee_address
      t.text :expense_description
      t.integer :pre_tax_amount_cents
      t.string :tax_name
      t.integer :tax_amount_cents

      t.timestamps
    end
  end
end
