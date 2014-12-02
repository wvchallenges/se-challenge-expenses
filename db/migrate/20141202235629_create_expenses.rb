class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.text :category
      t.text :employee_name
      t.text :expense_description
      t.decimal :pre_tax_amount, :precision => 8, :scale => 2
      t.text :tax_name
      t.decimal :tax_amount, :precision => 8, :scale => 2

      t.timestamps
    end
  end
end
