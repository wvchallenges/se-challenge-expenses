class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.string :category
      t.string :employee_name
      t.text :employee_addr
      t.string :description
      t.decimal :amount
      t.string :tax_type
      t.decimal :tax
      t.decimal :total_amount

      t.timestamps
    end
  end
end
