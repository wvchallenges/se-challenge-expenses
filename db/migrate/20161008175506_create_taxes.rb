class CreateTaxes < ActiveRecord::Migration
  def change
    create_table :taxes do |t|
      t.string :name

      t.timestamps null: false

      t.index :name
    end
  end
end
