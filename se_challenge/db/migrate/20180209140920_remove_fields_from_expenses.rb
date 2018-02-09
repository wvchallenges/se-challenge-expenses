class RemoveFieldsFromExpenses < ActiveRecord::Migration[5.1]
  def change
    remove_column :expenses, :date
    remove_column :expenses, :category
    remove_column :expenses, :employee_name
    remove_column :expenses, :employee_address
    remove_column :expenses, :expense_description
    remove_column :expenses, :pre_tax_amount
    remove_column :expenses, :tax_name
    remove_column :expenses, :tax_amount
  end
end
