class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.string :date, null:false
      t.string :category, null:false
      t.string :employee_name, null:false
      t.string :employee_address, null:false
      t.string :expense_description, null:false
      t.numeric :pretax_amount, null:false
      t.string :tax_name, null:false
      t.numeric :tax_amount, null:false

      t.timestamps
    end
  end
end
