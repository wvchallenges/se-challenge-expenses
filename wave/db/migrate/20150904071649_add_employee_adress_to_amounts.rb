class AddEmployeeAdressToAmounts < ActiveRecord::Migration
  def change
    add_column :amounts, :employee_adress, :string
  end
end
