class CreateTaxes < ActiveRecord::Migration[5.0]
  def change
    create_table :taxes do |t|
      t.string :tax_name

      t.timestamps
    end
  end
end
