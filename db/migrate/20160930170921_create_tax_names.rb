class CreateTaxNames < ActiveRecord::Migration[5.0]
  def change
    create_table :tax_names do |t|
      t.string :name

      t.timestamps
    end
  end
end
