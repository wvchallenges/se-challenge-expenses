class AddEmployeeAddressColumn < ActiveRecord::Migration
  def up
    add_column :expenses, :employee_address, :text
  end

  def down
  end
end
