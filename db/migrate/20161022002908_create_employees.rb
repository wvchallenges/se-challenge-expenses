class CreateEmployees < ActiveRecord::Migration[5.0]
  def change
    create_table :employees do |t|
      t.date :date
      t.string :category
      t.string :name
      t.string :address
      t.string :expense_description
      t.decimal :pre_tax_amount
      t.string :tax_name
      t.decimal :tax_amount

      t.timestamps
    end
  end
end