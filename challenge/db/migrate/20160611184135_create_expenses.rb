class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.string :category
      t.string :employee_name
      t.string :employee_address
      t.string :description
      t.decimal :pre_tax_amount, precision: 11, scale: 2
      t.string :tax_name
      t.decimal :tax_amount, precision: 11, scale: 2

      t.timestamps null: false
    end
  end
end
