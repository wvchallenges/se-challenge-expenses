class CreateTaxes < ActiveRecord::Migration
  def change
    create_table :taxes do |t|
      t.string :name
      t.float :rate

      t.timestamps
    end
  end
end
