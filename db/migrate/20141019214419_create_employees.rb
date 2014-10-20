class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :name
      t.integer :address_id

      t.timestamps
    end
  end
end
