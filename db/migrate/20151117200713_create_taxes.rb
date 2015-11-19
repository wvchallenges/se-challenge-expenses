class CreateTaxes < ActiveRecord::Migration
  def change
    create_table :taxes do |t|
      t.string :name, null: false

      t.timestamps null: false

      t.index(:name, unique: true)
    end
  end
end
