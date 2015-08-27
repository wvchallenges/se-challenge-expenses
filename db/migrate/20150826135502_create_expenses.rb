class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.datetime :transaction_date
      t.string :category
      t.text :description
      t.float :amount
      t.string :sales_tax
      t.integer :employee_id

      t.timestamps
    end
  end
end
