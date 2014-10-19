class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.string :category
      t.datetime :date
      t.string :expense_description
      t.float :pre_tax_amount
      t.string :tax_name
      t.float :tax_amount
      t.integer :csvfile_id
      t.integer :employee_id

      t.timestamps
    end
  end
end
