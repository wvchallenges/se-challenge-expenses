class CreateEmployeeExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :employee_expenses do |t|
      t.date :date
      t.string :description
      t.decimal :pre_tax_amount
      t.decimal :tax_amount
      t.string :tax_name
      t.belongs_to :employee, foreign_key: true
      t.belongs_to :expense_category, foreign_key: true

      t.timestamps
    end
  end
end
