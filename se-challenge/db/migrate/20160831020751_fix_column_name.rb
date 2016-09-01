class FixColumnName < ActiveRecord::Migration[5.0]
  def change
  	rename_column :expenses, :employee_description, :expense_description
  end
end
