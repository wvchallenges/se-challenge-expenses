class RemoveEmployeeInfo < ActiveRecord::Migration
  def change
    remove_column :expenses, :employee_name, :string
    remove_column :expenses, :employee_address, :text
  end
end
