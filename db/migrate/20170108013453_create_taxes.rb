class CreateTaxes < ActiveRecord::Migration[5.0]
  def change
    create_table :taxes do |t|
      t.string :name, null: false
      t.float :percentage, null: false
    end
  end
end
