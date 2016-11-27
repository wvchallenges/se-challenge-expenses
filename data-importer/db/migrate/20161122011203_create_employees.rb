class CreateEmployees < ActiveRecord::Migration[5.0]
  def change
    create_table :employees do |t|
      t.string :employee_name
      t.text :employee_address

      t.timestamps
    end
  end
end
