class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.date :date
      t.string :category
      t.string :employee_name
      t.string :employee_address
      t.string :expense_description
      t.float :pre_tax_amount
      t.string :tax_name
      t.float :tax_amount

      t.timestamps
    end
  end
end
