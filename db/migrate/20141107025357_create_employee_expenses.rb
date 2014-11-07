class CreateEmployeeExpenses < ActiveRecord::Migration
  def change
    create_table :employee_expenses do |t|
      t.datetime :date
      t.string :category
      t.string :employee_name
      t.string :employee_address
      t.string :expense_description
      t.decimal :pre_tax_amount, :precision => 16, :scale => 2
      t.string :tax_name
      t.decimal :tax_amount, :precision => 16, :scale => 2

      t.timestamps
    end
  end
end
