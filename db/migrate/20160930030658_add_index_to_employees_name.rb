class AddIndexToEmployeesName < ActiveRecord::Migration[5.0]
  def change
    add_index :employees, :name, unique: true
  end
end
