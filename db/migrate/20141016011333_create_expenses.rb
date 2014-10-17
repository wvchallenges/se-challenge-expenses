class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.string :date
      t.string :category
      t.string :employee_name
      t.string :employee_address
      t.string :expense_description
      t.decimal :pre_tax_amount, :precision => 6, :scale => 2
      t.string :tax_name
      t.decimal :tax_amount, :precision => 6, :scale => 2

      t.timestamps
    end
  end
end
