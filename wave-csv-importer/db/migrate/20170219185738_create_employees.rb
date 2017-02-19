class CreateEmployees < ActiveRecord::Migration[5.0]
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.timestamps
    end

    change_table :employees do |t|
      add_index :employee, [:name, :address], unique: true
    end
  end
end
