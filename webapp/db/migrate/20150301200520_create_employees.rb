class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :date
      t.string :category
      t.string :employee_name
      t.text :employee_address
      t.string :expense_description
      t.integer :pre_tax_amount
      t.string :tax_name
      t.integer :tax_amount
    end
  end
