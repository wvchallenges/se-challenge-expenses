class AddIndexToCategoriesName < ActiveRecord::Migration[5.0]
  def change
    add_index :categories, :name, unique: true
  end
end
