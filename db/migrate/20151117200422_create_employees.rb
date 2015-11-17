class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.string :address, null: false

      t.timestamps null: false

      t.index(:name, unique: true)
    end
  end
end
