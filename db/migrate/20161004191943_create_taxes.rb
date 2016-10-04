class CreateTaxes < ActiveRecord::Migration
  def change
    create_table :taxes do |t|
      t.date :date
      t.integer :category_id
      t.string :employee_name
      t.text :address
      t.text :exp_desc
      t.decimal :pre_tamount
      t.string :tax_name
      t.decimal :tax_amount

      t.timestamps
    end
  end
end
