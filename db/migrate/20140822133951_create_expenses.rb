class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
        t.date :date
        t.string :category
        t.string :expense_description
        t.float :pre_tax_income
        t.string :tax_name
        t.float :tax_amount
        t.references :employees , index: true

        t.timestamps
    end
  end
end
