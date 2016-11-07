class CreateAmounts < ActiveRecord::Migration
  def change
    create_table :amounts do |t|
      t.date :d
      t.string :category
      t.string :employee_name
      t.string :expense_description
      t.float :pre_tax_amount
      t.string :tax_name
      t.float :tax_amount
      t.float :total_tax

      t.timestamps
    end
  end
end
