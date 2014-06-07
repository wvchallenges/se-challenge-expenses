class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.string :postal_code

      t.timestamps
    end
  end
end
