class AddIndexToTaxNamesName < ActiveRecord::Migration[5.0]
  def change
    add_index :tax_names, :name, unique: true
  end
end
