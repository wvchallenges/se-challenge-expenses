class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.references :expense_category
      t.references :employee
      t.references :tax

      t.string :description

      t.decimal :pre_tax_amount
      t.decimal :tax_amount

      t.datetime :expensed_on

      t.timestamps
    end
  end
end
