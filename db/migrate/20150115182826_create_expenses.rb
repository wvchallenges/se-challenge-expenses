class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.datetime :date
      t.string :category
      t.string :employee_name
      t.string :employee_address
      t.string :expense_description
      t.float :pretax_amount
      t.string :tax_name
      t.float :tax_amount

      t.timestamps
    end
  end
end
