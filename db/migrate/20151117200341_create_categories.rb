class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name, null: false

      t.timestamps null: false

      t.index(:name, unique: true)
    end
  end
end
